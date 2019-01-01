MainController = ChessApp.controller('MainController',function($scope){
   
   
    var initData = function()
    {
        $scope.playArea = createPlayer();
        console.log("NEW GAME");
        for(var i = 0 ; i<64 ; i++)
        {
            //Pawn
            if($scope.playArea[i].row==1)
                {   
                    $scope.playArea[i].property.color="White";
                    $scope.playArea[i].property.type="Pawn";
                }
            
            if($scope.playArea[i].row==6)
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="Pawn";
            }

            //Rook    
            if($scope.playArea[i].row==0 && ($scope.playArea[i].col==0 || $scope.playArea[i].col==7))
            {   
                $scope.playArea[i].property.color="White";
                $scope.playArea[i].property.type="Rook";
            }

            if($scope.playArea[i].row==7 && ($scope.playArea[i].col==0 || $scope.playArea[i].col==7))
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="Rook";
            } 
        
            //Knight    
            if($scope.playArea[i].row==0 && ($scope.playArea[i].col==1 || $scope.playArea[i].col==6))
            {   
                $scope.playArea[i].property.color="White";
                $scope.playArea[i].property.type="Knight";
            }

            if($scope.playArea[i].row==7 && ($scope.playArea[i].col==1 || $scope.playArea[i].col==6))
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="Knight";
            }
        
            //Bishop    
            if($scope.playArea[i].row==0 && ($scope.playArea[i].col==2 || $scope.playArea[i].col==5))
            {   
                $scope.playArea[i].property.color="White";
                $scope.playArea[i].property.type="Bishop";
            }  
     
            if($scope.playArea[i].row==7 && ($scope.playArea[i].col==2 || $scope.playArea[i].col==5))
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="Bishop";
            }
             
            //King
            if($scope.playArea[i].row==0 && $scope.playArea[i].col==3)
            {   
                $scope.playArea[i].property.color="White";
                $scope.playArea[i].property.type="King";
            }

            if($scope.playArea[i].row==7 && $scope.playArea[i].col==4)
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="King";
            }
            
            //Queen
            if($scope.playArea[i].row==0 && $scope.playArea[i].col==4)
            {   
                $scope.playArea[i].property.color="White";
                $scope.playArea[i].property.type="Queen";
            }   
             
            if($scope.playArea[i].row==7 && $scope.playArea[i].col==3)
            {   
                $scope.playArea[i].property.color="Black";
                $scope.playArea[i].property.type="Queen";
            }    
             
        
        }


        
    };

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

    $scope.clicked = function($event,pos){
        pos.isActive=!pos.isActive;
        console.log(pos.sno);
        console.log(pos.row,pos.col);
        
        if(pos.isActive==true){
            highlight(pos.sno);
        }
        else
            antiHighlight(pos.sno);

        validMove(pos);
        
    };

    var highlight = function(sno){
        document.getElementById(sno).classList.add("active");
    }
    var antiHighlight = function(sno){
        document.getElementById(sno).classList.remove("active");
    }

    var validMove = function(pos){
        
        var valid=[];

        //   PAWN
        if(pos.property.type=="Pawn")
        {
            if(pos.property.color=="White")
            {
                console.log("WhitePawn");
                valid.push(7,8,9);
                if(pos.row==1)
                    valid.push(16);
            }
            else
            {
                console.log("BlackPawn");
                valid.push(-7,-8,-9);
                if(pos.row==6)
                valid.push(-16);

            }
        }

        if(pos.isActive == true)
            {
                for(var i=0 ; i<valid.length ; i++)
                {
                    highlight(pos.sno+valid[i]);
                }
            }
            else
            {
                for(var i=0 ; i<valid.length ; i++)
                {
                    antiHighlight(pos.sno+valid[i]);
                }
            }

    }

    initData();
    
});