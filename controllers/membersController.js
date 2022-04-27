const Member=require('../model/Member')

const getAllMembers = async(req, res) => {
    const members=await Member.find();
    if(!members) 
         return res.status(204).json({'message': 'No member found'});

         res.json(members);

}


const getMember  = async(req, res) => {
    console.log("**********",req)
    //if(!req?.params?.id){
        if(!req){
        return res.status(400).json({'message':'Id is required'})
    }
    
     const member=await Member.findOne({_id:req.params.id}).exec();
    if(!member)
        return res.status(204).json({'message':'Id does not exist'});
    res.json(member);
 
 }


const createNewMembers= async(req, res) => {
  
    //if(!req?.body?.firstname||!req?.body?.lastname)
    if(!req)
        return res.status(400).json({'message':'Firstname and lastname are required'})
    
try{
const result=await Member.create({
    firstname:req.body.firstname,
    lastname:req.body.lastname

});
res.status(201).json(result);
}
catch(err){
    console.error(err);
}
}

const updateMember  = async(req, res) => {
   //if(!req?.body?.id){
    if(!reqs){
       return res.status(400).json({'message':'Id is required'})
   }
   
    const member=await Member.findOne({_id:req.body.id}).exec();
   if(!member)
   return res.status(204).json({'message':'Id does not exist'});

  // if(req.body?.firstname) 
   member.firstname=req.body.firstname;
   //if(req.body?.lastname) 
   member.lastname=req.body.lastname;
   const result=await member.save()
   res.json(result)

}

const deleteMember  = async(req, res) => {
    //if(!req?.body?.id) 
    if(!req)
        return res.status(400).json({'message':'Id does not exist'});

const member=await Member.findOne({_id:req.body.id}).exec();
if(!member)
    return res.status(204).json({'message':'No member found'})

    const result=await member.deleteOne({_id:req.body.id});
    res.json(result)
}



module.exports = {
    getAllMembers,
    createNewMembers,
    updateMember,
    deleteMember,
    getMember
}