MainController = ChessApp.controller('MainController', function ($scope) {

    var valid = [];
    var lastClicked;

    var initData = function () {
        $scope.playArea = createPlayer();
        $scope.kills = {
            black: ["WhitePawn","WhiteKing"],
            white: ["BlackPawn","BlackKing"]
        };

        console.log("NEW GAME");
        for (var i = 0; i < 64; i++) {
            //Pawn
            if ($scope.playArea[i].row == 1) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "Pawn";
            }


            if ($scope.playArea[i].row == 6) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "Pawn";
            }

            //Rook    
            if ($scope.playArea[i].row == 0 && ($scope.playArea[i].col == 0 || $scope.playArea[i].col == 7)) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "Rook";
            }

            if ($scope.playArea[i].row == 7 && ($scope.playArea[i].col == 0 || $scope.playArea[i].col == 7)) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "Rook";
            }

            //Knight    
            if ($scope.playArea[i].row == 0 && ($scope.playArea[i].col == 1 || $scope.playArea[i].col == 6)) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "Knight";
            }

            if ($scope.playArea[i].row == 7 && ($scope.playArea[i].col == 1 || $scope.playArea[i].col == 6)) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "Knight";
            }

            //Bishop    
            if ($scope.playArea[i].row == 0 && ($scope.playArea[i].col == 2 || $scope.playArea[i].col == 5)) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "Bishop";
            }

            if ($scope.playArea[i].row == 7 && ($scope.playArea[i].col == 2 || $scope.playArea[i].col == 5)) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "Bishop";
            }

            //King
            if ($scope.playArea[i].row == 0 && $scope.playArea[i].col == 3) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "King";
            }

            if ($scope.playArea[i].row == 7 && $scope.playArea[i].col == 4) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "King";
            }

            //Queen
            if ($scope.playArea[i].row == 0 && $scope.playArea[i].col == 4) {
                $scope.playArea[i].property.color = "White";
                $scope.playArea[i].property.type = "Queen";
            }

          
            if ($scope.playArea[i].row == 7 && $scope.playArea[i].col == 3) {
                $scope.playArea[i].property.color = "Black";
                $scope.playArea[i].property.type = "Queen";
            }


        }



    };

    var createPlayer = function () {
        var data = [];

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                data.push({
                    row: i,
                    col: j,
                    sno: 0,
                    property: { color: "", type: "" },
                    isActive: false
                });
            }
        }
        return data;
    };

    

    $scope.clicked = function ($event, pos) {

        if (!lastClicked)        //FIRST CLICK
        {
            lastClicked = pos;
            pos.isActive = !pos.isActive;
           
            if (!lastClicked.property.color) {
                lastClicked = null;
                return;
            }
            check(pos);
            console.log("CURRENT : "+pos.sno);
            console.log("ROW : " + pos.row,"COL : " + pos.col);

            //Highlighting the current pos
            if (pos.isActive == true) {
                highlight(pos.sno);
            }
            else
                antiHighlight(pos.sno);

            validMove(pos);

            //Highlighting Valid Moves
            if (pos.isActive == true) {
                for (var i = 0; i < valid.length; i++) {
                    highlight(valid[i]);
                }
            }
            else {
                for (var i = 0; i < valid.length; i++) {
                    antiHighlight(valid[i]);
                }
            }

        }
        else        //SECOND CLICK
        {
           
            move(lastClicked, pos);
            checkMate(pos);
            lastClicked = null;
            for (var i = 0; i < 64; i++)           //ANTI HIGHLIGHTING ALL BLOCKS
            {
                $scope.playArea[i].isActive = false;
                antiHighlight(i);
            }
        }
    };

    var highlight = function (sno) {
        document.getElementById(sno).classList.add("active");
    }
    var antiHighlight = function (sno) {
        document.getElementById(sno).classList.remove("active");
    }

    var validMove = function (pos) {

        valid = [];

        for (var i = 0; i < 64; i++) {


            if (pos.property.type == "Knight")   //Knight
            {

                if (pos.property.color != $scope.playArea[i].property.color)
                {
                        if ($scope.playArea[i].row == (pos.row + 2) && (($scope.playArea[i].col == (pos.col - 1))|| ($scope.playArea[i].col == (pos.col + 1)))) {
                            valid.push($scope.playArea[i].row*8+$scope.playArea[i].col);
                        }

                        if ($scope.playArea[i].row == (pos.row - 2) && (($scope.playArea[i].col == (pos.col - 1))|| ($scope.playArea[i].col == (pos.col + 1)))) {
                            valid.push($scope.playArea[i].row*8+$scope.playArea[i].col);
                        }
                        if ($scope.playArea[i].row == (pos.row + 1) && (($scope.playArea[i].col == (pos.col - 2))|| ($scope.playArea[i].col == (pos.col + 2)))) {
                            valid.push($scope.playArea[i].row*8+$scope.playArea[i].col);
                        }
                        if ($scope.playArea[i].row == (pos.row - 1) && (($scope.playArea[i].col == (pos.col - 2))|| ($scope.playArea[i].col == (pos.col + 2)))) {
                            valid.push($scope.playArea[i].row*8+$scope.playArea[i].col);
                        }

                }



            }

           
        }

        if(pos.property.type == "Rook")
        {
            right(pos,7);
            left(pos,7);
            up(pos,7);
            down(pos,7);
        }

        if(pos.property.type == "Queen")
        {
            right(pos,7);
            left(pos,7);
            up(pos,7);
            down(pos,7);
            d1(pos,7);
            d2(pos,7);
            d3(pos,7);
            d4(pos,7);
        }

        if(pos.property.type == "King")
        {
            right(pos,1);
            left(pos,1);
            up(pos,1);
            down(pos,1);
            d1(pos,1);
            d2(pos,1);
            d3(pos,1);
            d4(pos,1);
        }

        if(pos.property.type == "Bishop")
        {
            d1(pos,7);
            d2(pos,7);
            d3(pos,7);
            d4(pos,7);
        }
        
        if(pos.row>0)
        {
            if(pos.property.type == "Pawn" && pos.property.color == "Black")
            {
                if($scope.playArea[pos.sno-8].property.color==""&& $scope.playArea[pos.sno-16].property.color=="" && pos.row==6)
                    {
                        up(pos,2);
                    }
                else if($scope.playArea[pos.sno-8].property.color=="")
                    {up(pos,1);}
                if($scope.playArea[pos.sno-7].property.color=="White")
                    {d2(pos,1);}
                if($scope.playArea[pos.sno-9].property.color=="White")
                    {d1(pos,1);}
            }
        }

        if(pos.row<7){
            if(pos.property.type == "Pawn" && pos.property.color == "White")
            {
                if($scope.playArea[pos.sno+8].property.color=="" && $scope.playArea[pos.sno+16].property.color==""  && pos.row==1)
                    {
                        down(pos,2);
                    }
                else if($scope.playArea[pos.sno+8].property.color=="")
                    {down(pos,1);}
                if($scope.playArea[pos.sno+7].property.color=="Black")
                    {d4(pos,1);}

                if($scope.playArea[pos.sno+9].property.color=="Black")
                    {d3(pos,1);}
            }
        }
        
       
    }

    var right = function(pos,max){
        var j = pos.sno+1;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j>63 || ($scope.playArea[j].col==0) || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j+=1;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var left = function(pos,max){
        var j = pos.sno-1;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            
         while(1){
             
            if((j<0 || ($scope.playArea[j].col==7) || $scope.playArea[j].property.color == pos.property.color))
            {  break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j-=1;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
         }
    }

    var up = function(pos,max){
        var j = pos.sno-8;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j<0  || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                   
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j-=8;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var down = function(pos,max){
        var j = pos.sno+8;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j>63  || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j+=8;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var d1 = function(pos,max){
        var j = pos.sno-9;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j<0 || ($scope.playArea[j].col==7)  || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j-=9;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var d2 = function(pos,max){
        var j = pos.sno-7;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j<0 || ($scope.playArea[j].col==0)  || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j-=7;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var d3 = function(pos,max){
        var j = pos.sno+9;
        var no_of_moves=0;
        if(pos.property.color=="White")
            {var opp_color="Black";}
        else if(pos.property.color=="Black")
            {var opp_color="White";}

            while(1){
            if((j>63 || ($scope.playArea[j].col==0)  || $scope.playArea[j].property.color == pos.property.color))
            { 
                break; 
            }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    console.log(" OPPOSITE COLOR : " + opp_color);
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j+=9;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }
    var d4 = function(pos,max){
        var j = pos.sno+7;
        var no_of_moves=0;
        if(pos.property.color=='White')
            var opp_color="Black";
        else
            var opp_color="White";

            while(1){
            if((j>63 || ($scope.playArea[j].col==7)  || $scope.playArea[j].property.color == pos.property.color))
            { break; }
            else{
                if($scope.playArea[j].property.color==opp_color)
                {
                    valid.push($scope.playArea[j].sno);
                    break;
                }
                valid.push($scope.playArea[j].sno);
            }

            j+=7;
            no_of_moves+=1;
            if(no_of_moves == max){
                return;
            }
        }
    }

    var move = function (currentPos, nextPos) {


        for (i = 0; i < valid.length; i++) {

            if (currentPos.sno != nextPos.sno && nextPos.sno == valid[i]) {

                
                if (nextPos.property.color == "Black") {                                        // ADDING THE DEAD BLACK
                    $scope.kills.white.push(nextPos.property.color + nextPos.property.type);
                }
                else if (nextPos.property.color == "White") {                                   // ADDING THE DEAD WHITE
                    $scope.kills.black.push(nextPos.property.color + nextPos.property.type);
                }


                nextPos.property.color = currentPos.property.color;
                nextPos.property.type = currentPos.property.type;
                currentPos.property.color = "";
                currentPos.property.type = "";
            }
        }
    }

    var checkMate = function(pos){
        
        validMove(pos);
        for(j=0 ; j<64 ;j++)
        {
            for(i=0 ; i<valid.length ; i++)
            {
                if(valid[i]==$scope.playArea[j].sno && $scope.playArea[j].property.type=="King"){
                    window.alert("#####CHECK#####");
                }
            }
        }
        
    }

    var kingSides=function(r,c,tempBoard,kingPos,sameColor){
        
        var vacant=[];
        
        
        if((r-1)>0) //up
        {
            if(tempBoard[kingPos-8].property.color!=sameColor)
                vacant.push("u");
        }
        if((r-1)>0 && (c+1)<7) //up-right
        {
            if(tempBoard[kingPos-7].property.color!=sameColor)
                vacant.push("ur");
        }
        if((r-1)>0 && (c+1)>0) //up-left
        {
            if(tempBoard[kingPos-9].property.color!=sameColor)
                vacant.push("ul");
        }
        if((c-1)>0) //left
        {
            if(tempBoard[kingPos-1].property.color!=sameColor)
                vacant.push("l");
        }
        if((c+1)<7) //right
        {
            if(tempBoard[kingPos+1].property.color!=sameColor)
                vacant.push("r");
        }
        if((r+1)<7) //down
        {
            if(tempBoard[kingPos+8].property.color!=sameColor)
                vacant.push("d");
        }
        if((r+1)<7 && (c+1)<7) //down-right
        {
            if(tempBoard[kingPos+9].property.color!=sameColor)
                vacant.push("dr");
        }
        if((r+1)<7 && (c+1)>0) //down-left
        {
            if(tempBoard[kingPos+7].property.color!=sameColor)
                vacant.push("dl");
        }

        if(vacant.length==0)
        {
            vacant.push("true");  //King is safe (covered with same color)
        }

        return vacant;
    }
    var check=function(pos){
        let tempBoard = $scope.playArea.concat();
        var j=0;
        var removePos = pos.sno;
        var sameColor= pos.property.color;

        if(sameColor=="White")
            var oppColor="Black";
        else
            var oppColor="White";

        let tempColor=tempBoard[removePos].property.color;
        let tempType=tempBoard[removePos].property.type
        tempBoard[removePos].property.type ="";
        tempBoard[removePos].property.color ="";

        for(j = 0 ; j<64 ; j++)
        {
            if(tempBoard[j].property.type == "King" && tempBoard[j].property.color == sameColor)
                {
                    var kingPos = tempBoard[j].sno;
                    break;
                }
        }

        var r = tempBoard[kingPos].row;
        var c = tempBoard[kingPos].col;

        var vacant = kingSides(r,c,tempBoard,kingPos,sameColor);
        for(i=0 ; i <vacant.length ; i++)
        {
            console.log("VACANT[" + i + "] : " + vacant[i]);
        }
        var message;
        if(vacant[0] != "true")       //KING IS NOT SAFE
            {message = vacantCheck(tempBoard,vacant,pos,kingPos,oppColor,tempType);}
        else
            {message = "Valid move";}
        
        console.log("!!MESSAGE!! : " + message);
        tempBoard[removePos].property.type =tempType;
        tempBoard[removePos].property.color =tempColor;
    }

    var vacantCheck = function(tempBoard,vacant,pos,kingPos,oppColor,tempType){

        for(var i=0 ; i< vacant.length ; i++)
        {
            
            if(vacant[i]=="u")
            {
                var j=kingPos-8;
                console.log("CHECKING UP DIRECTION");
                console.log("TEmp type : "+ tempType);
                while(1)
                    {

                        if(tempBoard[j].property.color == oppColor)
                        {
                            if((tempBoard[j].property.type == "Queen" || tempBoard[j].property.type == "Rook") && (tempType != "Queen" && tempType != "Rook") )
                                return "INVALID MOVE";
                            break;
                        }
                        j-=8;
                        if(j<0)
                            break;
                    }
            }
        }
        return "Valid Move";
    }

    $scope.newGame= function(){
        initData();
    }

    $scope.closeModal=function()
    {
        document.getElementById("modal").style.zIndex=0;
        document.getElementById("modal").style.opacity=0;
        if( $scope.player1=="")
            $scope.player1="Player 1";
        if($scope.player2=="")
            $scope.player2="Player 2";    
        console.log("Player 1 : "+ $scope.player1);
        console.log("Player 2 : "+ $scope.player2);
    }

    $scope.player1="";
    $scope.player2="";
  
    initData();


});
