var classData = d3.json("classData.json")

var getPicture = function(student){
    return "imgs/"+student.picture;}

var getGrade=function(quiz)
{return quiz.grade}
var meanQuizes = function(student)
{return d3.mean(student.quizes.map(getGrade))}

var meanHomeworks = function(student){
    return d3.mean(student.homework.map(getGrade));}

var meanTests = function(student){
    return d3.mean(student.test.map(getGrade));}

var getFinal = function(student){return student.final.map(getGrade)}
    

var successFCN = function(classData)
{console.log("Data collected",classData);
 drawTable(classData);
 initHeaders(classData)};
 
 var failFCN = function(errorMsg)
{console.log("Whoops, something went wrong",errorMSG);}
 
var drawTable = function(students){
 var rows = d3.select("tbody")
 .selectAll("tr")
 .data(students)
 .enter()
 .append("tr")
 
 rows.append("td")
 .append("img")
 .attr("src",getPicture);
 
 rows.append("td")
 .text(function(student) {return meanQuizes(student)});
 
 rows.append("td")
 .text(function(student) {return meanHomeworks(student)});
 
 rows.append("td")
 .text(function(student) {return meanTests(student)});
 
 rows.append("td")
 .text(function(student) {return getFinal(student)})
    .attr("class","final");
};

var clearTable = function(){
    d3.selectAll ("tr").remove();
}

var initHeaders = function (students){
    console.log("clicked grade of final");
    d3.select("#GradeFinal").on("click",function(){
    
        students.sort(function(a,b) {var a1=getFinal(a);var b1=getFinal(b);
                                    if(a1<b1) {return -1;}
                                    else if (a1==b1) {return 0}
                                    else {return 1;}});
        clearTable();
        drawTable(students);
        d3.selectAll(".final")
        .attr("class","selected");
    
})}
                                 
 
classData.then(successFCN,failFCN);