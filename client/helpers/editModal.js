Template.editModal.helpers({

  transportTypes: function(){
    return ['1','2','3','4','5']
  },

  selectedValue:  function (choice, transportType) {
    if (choice === transportType) {
      return true;
    }
    else {
      return false;
    }
  },

  loopCount: function(count){
    var countArr = [];
    for (var i=1; i<count; i++){
      countArr.push({});
    }
    return countArr;
  }

});
