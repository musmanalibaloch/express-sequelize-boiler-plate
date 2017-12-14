'use strict';
const db=require('../config/sequelize.config');
let express=require('express');
let app=express();


  
    const AddNewSlotsDaily = (req,res,type,days)=>
    {
        return new Promise((resolve,reject) =>
        {
                scheduleHelper.create(req.body.doctorId,type)
                .then(schObj=>
                { 
                    if(schObj){   
                    
                        let elem=[];
                    
                        for(let x of days)  //creating object for single bulkCreate operation
                        {
                            elem.push({day:x,scheduleId:schObj.id});
                        }
                        console.log(elem);
                        db.slot.bulkCreate(elem).
                        then(slotObj=>
                        {
                            if(!_.isEmpty(slotObj))
                            {
                            slotHelper.findByScheduleId(schObj.id).
                            then(slotObj =>
                            {
                                //console.log('id:'+slotObj[0].id);
                                let slots=[];  //create json object of all slots
                                for(var i=0;i<elem.length;i++)
                                {      slots=[];
                                    for(var j=0;j<req.body.slots[i].timeSlots.length;j++)
                                    {
                                        let ST=new Date(req.body.slots[i].timeSlots[j].startTime);
                                        let ET=new Date(req.body.slots[i].timeSlots[j].endTime);
                                        slots.push({slotId:slotObj[i].id,startTime:ST,endTime:ET});
                                    }
                                    
                                    db.timeSlot.bulkCreate(slots).
                                    then(tsObj => 
                                    {
                                        resolve(200);
                                    }).
                                    catch(err => 
                                    {
                                        //res.status(404).send({"error":true,"message":"Error occurred in updating slots"});
                                        console.log(err);
                                        reject(err);
                                    });
                                }

                            }).
                            catch(err => 
                            {
                               // res.status(404).send({"error":true,"message":"Error occurred in updating slots"});
                               console.log(err);
                                    reject(err);
                            })
                            
                            }      
                        
                        }).
                        catch(err => 
                        {
                            //res.status(404).send({"error":true,"message":"Error occurred in updating slots"});
                            console.log(err);
                            reject(err);
                        })
                    }
                    else
                    {
                        res.status(404).send({"error":true,"message":"Error occurred in updating slots"});
                    }
                
                
                
                })
                .catch(err => 
                {
                    console.log('level');
                    reject(err);
                });
            });    
    }




module.exports.addSlots=addSlots;
