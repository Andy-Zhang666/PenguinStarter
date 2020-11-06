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
 var rows = d3.select("tbody")
 .selectAll("tr")
 .data(classData)
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
 .text(function(student) {return getFinal(student)});
}
 var failFCN = function(errorMsg)
{console.log("Whoops, something went wrong",errorMSG);}
classData.then(successFCN,failFCN);