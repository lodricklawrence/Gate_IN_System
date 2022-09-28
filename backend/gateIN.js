const { PrismaClient }=require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt=require("bcrypt");
const { DateTime } = require("luxon");
const saltRounds=10;

const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");

const gateInController={
    addWorkers:async (req,res)=>{
            const workers=await prisma.workers.findMany({
              where:{
                email:req.body.email
            }
      })
      if(workers==false){
        if(req.body.fullname && req.body.email && req.body.password && req.body.phone && req.body.department){
          try {
            const deptData=await prisma.Department.findUnique({
              where:{
                name:req.body.department
              }
            });
      
            const pass=req.body.password;
            const hashPass=await bcrypt.hash(pass,saltRounds);
            const phone=Number(req.body.phone);
            const deptId=deptData.id;
            const addWorkers=await prisma.Workers.create({
              data:{
                fullname:req.body.fullname.toUpperCase(),
                email:req.body.email,
                password:hashPass,
                phone:phone,
                departmentId:deptId
              }
            })
      
            res.json({
              message:"data registered successfully"
          });
          } catch (error) {
            console.log(error);
          }
        }else{
          res.json({message:"empty fields are forbidden"});
        }
        
      }else {
        res.json({message:"email ready in use"});
      }
        
 },

 login:async (req,res)=>{
    const user=await prisma.Workers.findUnique({
      where:{
        email:req.body.email
      }
    })
   
    if(user){
      try {
        const password=req.body.password;
        const match=await bcrypt.compare(password,user.password);
        if(match){
        await jwt.sign({user}, 'secretkey',{expiresIn:'20m'},(err,token,admin,status)=>{
          res.json({
            token,
            admin:user.isAdmin,
            status:user.status
          });
          })
        }else{
          res.json({message:"wrong username or password"});
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      res.json({message:"wrong username or password"});
    }
  },

  getAllWorkers: async (req,res)=>{
            try {
                const allWorkers=await prisma.Workers.findMany();
                res.json(allWorkers)
              } catch (error) {
                console.log(error)
              }
   
  },

  getWorkersById:async (req,res)=>{
    const id=Number(req.params.id);
    const idWorker=await prisma.Workers.findUnique({
      where:{
        id:id
      }
    })
  
    if(idWorker){
      try {
        res.json(idWorker);
      } catch (error) {
        console.log(error);
      }
    }else{
      res.sendStatus(404);
    }
  },


getWorkersByDepartment:async (req,res)=>{
  
    const workersDept=await prisma.Department.findMany({
      where:{
        name:{
          contains:req.body.department
        }
      },
      include:{
        Workers:true
      }
    })
    if(workersDept){
      try {
        res.json({
          workersDept,
          dept:req.body.department
        });
      } catch (error) {
        console.log(error);
      }
      
    }else{
      res.sendStatus(404)
    }
  
  },

  editWorkers:async (req,res)=>{
    const id=Number(req.params.id);
    const idWorker=await prisma.Workers.findUnique({
      where:{
        id:id
      }
    })
  
    if(idWorker){
      if(req.body.fullname && req.body.email && req.body.isAdmin!=='' && req.body.phone && req.body.status){
        try {
          const updateWorker=await prisma.Workers.update({
            where:{
              id:id
            },
            data:{
              fullname:req.body.fullname,
              email:req.body.email,
              isAdmin:req.body.isAdmin,
              phone:Number(req.body.phone),
              status:req.body.status
            }
          })
          res.json({
            message:"data updated successfully"
          })
        } catch (error) {
          console.log(error);
        }
      }else{
        res.json({
          message:"empty fields are forbidden"
        })
      }
  
    }else{
      res.sendStatus(404);
    }
  },

  deleteWorkers:async (req,res)=>{
    const id=Number(req.params.id);
    const idWorker=await prisma.Workers.findUnique({
      where:{
        id:id
      }
    })
    if(idWorker){
      try {
        const delWorker=await prisma.Workers.delete({
          where:{
            id:id
          }
        })
        res.send(delWorker);
      } catch (error) {
        console.log(error);
      }
    }else{
      res.sendStatus(404);
    }
  
  },

  sendEmail: async (req,res)=>{
    const email=await prisma.Workers.findUnique({
      where:{
        email:req.body.email
      }
    })
    if(email){
      try {
        
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'lodricklowrence@gmail.com',
              pass: 'oocg daxg afxm cgva'
            }
          });

          const mailOptions = {
            from: 'lodricklowrence@gmail.com',
            to: req.body.email,
            subject: 'Reset password',
            html: "<h3>Click the link below</h3>",
            html:"<p>'http://localhost:3000/resetPassword'</p>"
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.json({
                'Email sent':info.response,
                'message':'We have send to you a link to your email click it for further process'
            });
            }
          });
      } catch (error) {
        console.log(error)
      }
    }else{
      res.json({message:'Sorry! Email Not Found'})
    }
  },

  resetPassword: async (req,res)=>{
    const email= await prisma.Workers.findUnique({
      where:{
        email:req.body.email
      }
    })

    if(email){
      try {
        const pass=req.body.password;
        const hashPass=await bcrypt.hash(pass,saltRounds);
        const update=await prisma.Workers.update({
          where:{
            email:req.body.email
          },
          data:{
            password:hashPass
          }
        })

        res.json({
          message:"update is successfully"
        })
      } catch (error) {
        console.log(error);
      }

    }else{
      res.json({
        message:'sorry!! wrong email'
      })
    }
  },

//   GUESTS

  addGuests:async (req,res)=>{
      if(req.body.idNo && req.body.idType && req.body.fullname && req.body.deptVisited && req.body.phone){
        try {
          const deptDetails=await prisma.Department.findMany({
            where:{
              name:{
                contains:req.body.deptVisited
              }
            },
            include:{
              Room:true
            }
          })
          room=deptDetails[0].Room.id;
          floor=deptDetails[0].Room.floorId;
          const phone=Number(req.body.phone)
          let now=DateTime.now().setZone("Africa/Nairobi").plus({hours:3}).toISO();
          const addGuests=await prisma.Guests.create({
            data:{
              idNo:Number(req.body.idNo),
              idType:req.body.idType.toUpperCase(),
              fullname:req.body.fullname.toUpperCase(),
              deptVisited:req.body.deptVisited,
              date:req.body.date,
              arrival:now,
              departure:now,
              roomNo:room,
              floorNo:floor,
              phone:Number(req.body.phone),
              isAttendedTime:now
            }
          })
          res.json({addGuests,
                    message:'registration is successfull'
                  });
        } catch (error) {
          console.log(error);
        }
      }else{
        res.json({message:"empty fields are forbidden"});
      }
    
    
   
  },

  getAllGuests: async (req,res)=>{
    try {
      const allGuests=await prisma.Guests.findMany();
      console.log(allGuests);

      res.json(allGuests)
    } catch (error) {
      console.log(error)
    }
   
  },

  getGuestsById: async (req,res)=>{
    if(req.body.idNo && req.body.date){
      const idGuest=await prisma.Guests.findMany({
        where:{
          idNo:Number(req.body.idNo),
          date:req.body.date,
          isDeparture:'No'
        }
      })

      if(idGuest){
          try {
            res.send(idGuest)
          } catch (error) {
            console.log(error)
          }
      }else{
        res.sendStatus(404)
      }
    }else{
      res.json({message:"empty field in forbidden"})
    }
  },

  getGuestsByDeptVisited_time: async (req,res)=>{

    if(req.body.deptVisited && req.body.date){
      jwt.verify(req.token,'secretkey',async (err)=>{
        if(err){
          res.json({
            message:'Not found'
          });
        }else{
          const guestDetails=await prisma.Guests.findMany({
            where:{
              deptVisited:req.body.deptVisited,
              date:req.body.date,
            }
          })
          if(guestDetails){
            try {
              res.json(guestDetails)
            } catch (error) {
              console.log(error);
            }
          }else{
            res.sendStatus(404)
          }
        }
  })
  }else{
      res.json({message:"empty fields are forbidden"})
    }
    
  },

  getNotAttendedGuests: async (req,res)=>{
    jwt.verify(req.token,'secretkey',async (err)=>{
        if(err){
          res.json({
            message:'Not found'
          });
        }else{
            const guestDetails=await prisma.Guests.findMany({
                where:{
                  deptVisited:req.body.deptVisited,
                  isAttended:"No",
                  isDeparture:"No"
                }
              })
              if(guestDetails){
                try {
                  res.json(guestDetails)
                } catch (error) {
                  console.log(error);
                }
              }else{
                res.sendStatus(404)
              }
        }
  })

  },

  editAttendedGuests: async (req,res)=>{
    const id=Number(req.params.id)
    const idGuest=await prisma.Guests.findUnique({
      where:{
        id:id
      }
    })
    if(idGuest){
  try {
    const updateGuest=await prisma.Guests.update({
      where:{
        id:id
      },
      data:{
        isAttended:"Yes"
      }
    })
    res.json(updateGuest)
  } catch (error) {
    console.log(error);
  }
    }else{
  
    }
  },

  editNotAttendedGuests: async (req,res)=>{
    const id=Number(req.params.id)
    const idGuest=await prisma.Guests.findUnique({
      where:{
        id:id
      }
    })
  if(idGuest){
  try {
    const updateGuest=await prisma.Guests.update({
      where:{
        id:id
      },
      data:{
        isAttended:"Not Attended"
      }
    })
    res.json(updateGuest)
  } catch (error) {
    console.log(error);
  }
    }else{
      res.sendStatus(404);
    }
  },

  editGuestsDepartureTime:async (req,res)=>{
    const id=Number(req.params.id);
    const idGuest=await prisma.Guests.findUnique({
      where:{
        id:id
      }
    })
  
    if(idGuest){
      try {
        let now=DateTime.now().setZone("Africa/Nairobi").plus({hours:3}).toISO();
        const updateGuest=await prisma.Guests.update({
          where:{
            id:id
          },
          data:{
            departure:now,
            isDeparture:'Yes'
          }
        })
        res.json(updateGuest)
      } catch (error) {
        console.log(error);
      }
    }else{
      res.sendStatus(404);
    }
  
  },

  getDepartmentInfo:async (req,res)=>{
    const deptNames=await prisma.Department.findMany();
    if(deptNames){
      try {
        res.json(deptNames)
      } catch (error) {
        console.log(error)
      }
    }else{
      res.sendStatus(404);
    }
  },

  verifyToken:function verifyToken(req,res,next){
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
      req.token=bearerHeader;
      next();
    }else{
      res.json({message:"forbidden"})
    }
  }
}

module.exports=gateInController;