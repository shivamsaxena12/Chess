MainController = ChessApp.controller('MainController',function($scope){
    
    var valid=[];
    var lastClicked;

    var initData = function()
    {
        $scope.playArea = createPlayer();
        $scope.kills={
            black:[],
            white:[]
        };

        console.log("NEW GAME");
        for(var i = 0 ; i<64 ; i++)
        {
            //Pawn
            if($scope.playArea[i].row==1 )
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

        console.log("Click function START");
            if(!lastClicked)        //FIRST CLICK
            {       
                lastClicked=pos;
                pos.isActive=!pos.isActive;
                console.log("\n\nCOLOR : "+lastClicked.property.color);
                if(!lastClicked.property.color)
                {
                    lastClicked=null;
                    return;
                }
                    console.log(pos.sno);
                    console.log(pos.row,pos.col);
                
                    //Highlighting the current pos
                    if(pos.isActive==true){
                        highlight(pos.sno);
                    }
                    else
                        antiHighlight(pos.sno);
        
                    validMove(pos);
                
                    //Highlighting Valid Moves
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
            else        //SECOND CLICK
            {
                console.log("ACTIVE AREAS : "+lastClicked.row+"  next pos :"+pos.row );
                move(lastClicked,pos);
                lastClicked=null;
                for(var i=0 ; i<64 ; i++)           //ANTI HIGHLIGHTING ALL BLOCKS
                {
                    $scope.playArea[i].isActive=false;
                    antiHighlight(i);
                }    
            }   
            
        
        
        console.log("Click function END");
    };

    var highlight = function(sno){
        document.getElementById(sno).classList.add("active");
    }
    var antiHighlight = function(sno){
        document.getElementById(sno).classList.remove("active");
    }
    
    var validMove = function(pos){
        
        valid=[];

        
        if(pos.property.type=="Pawn")   //PAWN
        {
             
            for(var i=0 ; i<64 ; i++)
            {
                if(pos.property.color=="White")     //WHITE_PAWN
                {  
                    if(((pos.sno+8) == $scope.playArea[i].sno ) && ($scope.playArea[i].property.color==""))
                    {
                        valid.push(8);
                        if(pos.row == 1 && ((pos.sno+16) == $scope.playArea[i+8].sno ) && ($scope.playArea[i+8].property.color==""))
                        {
                            valid.push(16);
                        }
                    }
                    
                    if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col-1))) && ($scope.playArea[i].property.color=="Black"))
                    {
                        valid.push(7);
                    }
                    else if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col+1)))  && ($scope.playArea[i].property.color=="Black"))
                    {
                        valid.push(9);
                    }
                }
                else    //BLACK_PAWN
                {
                        if(((pos.sno-8) == $scope.playArea[i].sno ) && ($scope.playArea[i].property.color==""))
                        {
                            valid.push(-8);
                            if(pos.row == 6 && ((pos.sno-16) == $scope.playArea[i-8].sno ) && ($scope.playArea[i-8].property.color==""))
                        {
                            valid.push(-16);
                        }
                        }
                        if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col+1))) && ($scope.playArea[i].property.color=="White"))
                        {
                            valid.push(-7);
                        }
                        else if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col-1)))  && ($scope.playArea[i].property.color=="White"))
                        {
                            valid.push(-9);
                        }
                }
                
                

            }
        }



        if(pos.property.type=="Knight")   //Knight
        {
             
            for(var i=0 ; i<64 ; i++)
            {
                if(pos.property.color=="White")     //WHITE_KNIGHT
                {  
                    if(($scope.playArea[i].row == (pos.row+2)&& ($scope.playArea[i].col == (pos.col-1))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(15);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row+2)&& ($scope.playArea[i].col == (pos.col+1))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(17);
                    }

                    if(($scope.playArea[i].row == (pos.row-2)&& ($scope.playArea[i].col == (pos.col+1))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(-15);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row-2)&& ($scope.playArea[i].col == (pos.col-1))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(-17);
                    }

                    if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col+2))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(-6);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col-2))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(-10);
                    }

                    if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col-2))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(6);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col+2))) && ($scope.playArea[i].property.color!="White"))
                    {
                        valid.push(10);
                    }

                }
                else    //BLACK_KNIGHT
                {
                    if(($scope.playArea[i].row == (pos.row+2)&& ($scope.playArea[i].col == (pos.col-1))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(15);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row+2)&& ($scope.playArea[i].col == (pos.col+1))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(17);
                    }

                    if(($scope.playArea[i].row == (pos.row-2)&& ($scope.playArea[i].col == (pos.col+1))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(-15);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row-2)&& ($scope.playArea[i].col == (pos.col-1))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(-17);
                    }

                    if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col+2))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(-6);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row-1)&& ($scope.playArea[i].col == (pos.col-2))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(-10);
                    }

                    if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col-2))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(6);
                    }
                    
                    if(($scope.playArea[i].row == (pos.row+1)&& ($scope.playArea[i].col == (pos.col+2))) && ($scope.playArea[i].property.color!="Black"))
                    {
                        valid.push(10);
                    }
                }
                
                

            }
        }


     

    }
    
    var move = function(currentPos,nextPos){
        console.log("MOVE function ENTERED \n");

       
        for(i=0 ; i<valid.length ; i++)
        {
            
            if(currentPos.sno!=nextPos.sno && nextPos.sno == (currentPos.sno+valid[i]))
            {
                
                var temp="";
                if(nextPos.property.color=="Black")
                {
                    $scope.kills.white.push(nextPos.property.color+nextPos.property.type);
                }
                else if(nextPos.property.color=="White")
                {
                    $scope.kills.black.push(nextPos.property.color+nextPos.property.type);
                }

            
                nextPos.property.color=currentPos.property.color;
                nextPos.property.type=currentPos.property.type;
                currentPos.property.color="";
                currentPos.property.type="";
            }
        }
    }
    initData();
    
});
