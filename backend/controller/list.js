const listModel = require('../model/list');
const listItemModel = require('../model/listItem');
const listUserModel = require('../model/listUser');
const authModel = require('../model/auth');

exports.newList = (req, res, next) => {
  let listItem = [];
  // console.log(req);
  const listData = new listModel({
    name: req.body.name,
    sharedWith: req.body.sharedWith,
    description: req.body.description,
    dateCreated: Date.now(),
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    listItems: [],
    createdBy: req.userData.email
  });

  authModel.find({email: req.body.sharedWith}).then(result => { // find if all users are registered members
    console.log(req.body.sharedWith.indexOf(req.userData.email));

    if(result.length !== req.body.sharedWith.length){ // if some members dont exist
      return res.status(400).json({
        message: 'One or more users are not registered'
      });
    } else if(req.body.sharedWith.indexOf(req.userData.email) >= 0) { // if user tried to share the list with them selves
      console.log('already stored');
        return res.status(401).json({
          message: 'You dont need to share the list with your self'
        });
      } else {
        listData.save().then(() => {  // save the list
          req.body.sharedWith.push(req.userData.email);  // push the users email to the shared with so they are only included once
          req.body.list.forEach(function (data) {
            const itemData = new listItemModel({ // for each item created an addition to the collection
              name: data.listItem,
              completed: false,
              createdBy: req.userData.userId,
              completedBy: null,
              createdOn: Date.now(),
              list: listData._id
            });

            listItem.push(itemData._id); // add all ids of items to array
            itemData.save() // save the items list data
          });
          req.body.sharedWith.forEach(function (data) { // for each member add a collection linking the user to the list
            authModel.findOne({email: data}).then(results => { // create the user-->list
              const sharingWith = new listUserModel({
                email: data,
                userId: results._id,
                list: listData._id
              });
              sharingWith.save();
            });
          });

          if(listItem.length === req.body.list.length){  // push all the items ids to the orginal save list
            listModel.updateMany({_id: listData._id}, {"$push": {"listItems": listItem}}).then();
          }

          res.status(200).json({
            message: 'Success',
            listData,
            items: listItem
          })
        })
    }
  })

};

exports.getList = (req, res, next) => { // returns all lists for a user
  listUserModel.find({userId: req.userData.userId}).populate('list').then(data => {
    return res.status(200).json({
      message: 'success',
      content: data
    });
  });
};

exports.updateItem = (req, res, next) => { // check am item
  console.log("editting");
  listItemModel.updateOne({_id: req.body.id},  {"$set": {"completed": req.body.value }}).then(data => {
    if(data.nModified > 0){
      res.status(200).json({message: 'success'});
    }else {
      res.status(400).json({message: 'server failure, try again later'});
    }
  });
};

exports.removeList = (req, res, next) => {
  // console.log(req.params.id + " " +req.userData._id );
  listUserModel.deleteOne({userId: req.userData.userId, list: req.params.id}).then(data =>{
    if(data.n > 0){
      res.status(200).json({message: 'success'});
    } else {
      res.status(400).json({message: 'Server error, please try again later'})
    }
  })
};
