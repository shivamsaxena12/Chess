MainController = ChessApp.controller('MainController',function($scope){
   
   
    var initData = function()
    {
        $scope.playArea = createPlayer();
        console.log("NEW GAME");
       
    }
    var createPlayer = function(){
        var data=[];

        for(var i = 0; i<8 ; i++)
        {
            for(var j = 0 ; j<8 ; j++)
            {
                data.push({
                        row:i,
                        col:j,
                        sno:0,
                        property:{color:"",type:""},
                        isActive:false
                    });
            }
        }
        return data;
    };

   

    initData();
    
});