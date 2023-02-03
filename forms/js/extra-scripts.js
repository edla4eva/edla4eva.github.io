      //ajax for posting form data
      $("#regForm").submit(function (event) {
        event.preventDefault(); //stop submit
        //getData().done(handleData);
        //data: form.serialize(),
        // data: formData,
        $("#topButtonsDiv").hide();
        var selDept= $('#dept_idr :selected').text();
        //var selDept2= $("#dept_idr").children("option").filter(":selected").text();


        var form = $( this );
        var MatNo = $("#matno").val();

        $.ajax({
            type: "POST",
            url: url_global + "store_reg",
            data: form.serialize(),
            dataType: "json",
            encode: true,
            success: function (data) {

                //fetch data to verify if post was successful
                $.ajax({
                    type: "GET",
                    url: url_global + "get_reg/"+ MatNo,
                    data: form.serialize(),
                    dataType: "json",
                    encode: true,
                    success: function (data) 
                            {
                                //alert("Successful"); 
                                console.log("get succeeded \n");
                                //console.log(data);

                                let text = '';
                                text += '<h2 class="text-center">UNIVERSITY OF BENIN, BENIN CITY</h2>';
                                text += '<h4 class="text-center">FACULTY OF ENGINEERING</h4>';
                                text += '<h5 class="text-center">EXAMINATION COURSE REGISTRATION FORM 2021/2022 SESSION</h5>';
                                text += '<br>';
                                text += '<table class="table" border="1">';
                                // let formatedCourses1 = "";
                                // let formatedCourses2 = "";
                                let matno = "ENG999000";
                                let surname= "OLA";
                                let course='CPE000';
                                let course2='CPE000';
                                let credit ='0';
                                let credit2 ='0';

                                if(data.lenght>0){alert("data returned");}
                                console.log("coursecode \n" + data[0].CourseCode_1);
                                let formatedCourses1 = data[0].CourseCode_1 .replace(/;/g, "; ");
                                let formatedCourses2 = data[0].CourseCode_2 .replace(/;/g, "; ");
                                
                                let arrayCourse1 = data[0].CourseCode_1 .split(";");
                                let arrayCourse2 = data[0].CourseCode_2 .split(";");
                                let picMatno =  data[0].matno ;  //img                
                                text += '<tr><td class="mw-40" style="width: 180px;">MATNO/ REG. NO</td><td>' + data[0].matno  + '</td><td rowspan="3" class="mw-40" style="width: 100px;"> <img width="150" height="150" src="'+ url_global + 'jpg/' + picMatno + '.png" /></td></tr>';
                                text += '<tr><td>SURNAME</td><td>' + data[0].student_surname  + '</td></tr>';
                                text += '<tr><td>OTHER NAMES</td><td>' + data[0].student_firstname  + '</td></tr>';
                                text += '<tr><td>DEPARTMENT</td><td colspan="2">' + selDept + '</td></tr>';
                                text += '<tr><td>MODE OF ENTRY</td><td colspan="2">' + data[0].mode_of_entry  + '</td></tr>';
                                text += '<tr><td>LEVEL</td><td colspan="2">' + data[0].level  + '</td></tr>';
                                text += '<tr><td>PHONE NO.</td><td colspan="2">' + data[0].phone  + '</td></tr>';
                                text += '<tr><td>GENDER</td><td colspan="2">' + data[0].gender  + '</td></tr>';
                                // text += "<tr>";
                                // text += "<td class='text-wrap'><p class='text-wrap'>" + formatedCourses1+ "</p></td>";
                                // text += "<td class='text-wrap' colspan='2'> <p class='text-wrap'>" + formatedCourses2 + "</p></td>";
                                // text += "</tr>";
                                text += '</table>';

                                text += '<h5 class="text-center">REGISTER CARRY OVER COURSES FIRST</h5>';
                                text += '<table class="table" border="1" width="100%">';
                                text += '<table class="table" border="1">';
                                text += '<tr><td colspan=2>FIRST SEMESTER</td><td colspan=2>SECOND SEMESTER</td></tr>'; 
                                //text += '<tr><td  class="mw-30" style="width: 100px;">COURSE CODE</td><td>CREDIT</td><td class="mw-30" style="width: 100px;>COURSE CODE</td><td ">CREDIT</td></tr>';
                                glbCredit_1=0;
                                glbCredit_2=0;
                                let strCourses1 = ""
                                let strCourses2 = ""
                                for (let i = 0; i < arrayCourse1.length; i++ ) {
                                    course = arrayCourse1[i];
                                    credit=getCredit(course);
                                    strCourses1 = strCourses1 + course + "  -  " + credit + "\n";
                                    glbCredit_1 = parseInt(glbCredit_1) + parseInt(credit);
                                   // text += '<tr><td>' + course + '</td><td>'+ credit + '</td><td>' + course + '</td><td class="mw-40" style="width: 180px;">' + credit + '</td></tr>';
                                }
                                for (let i = 0; i < arrayCourse2.length; i++ ) {
                                    course2=arrayCourse2[i];
                                    credit2=getCredit(course2);
                                    strCourses2 = strCourses2 + course2 + "  -  " + credit2 + "\n";
                                    glbCredit_2 = parseInt(glbCredit_2) + parseInt(credit2);
                                   // text += '<tr><td>' + course + '</td><td>'+ credit + '</td><td>' + course + '</td><td class="mw-40" style="width: 180px;">' + credit + '</td></tr>';
                                }
                                text += '<tr><td class="text-wrap" colspan=2><pre>' + strCourses1 + '</pre></td>'+ '<td colspan=2><pre>' + strCourses2 + '</pre></td>'  + '</tr>';
                                text += '<tr><td colspan=2>' + 'Total' + "  -  " + glbCredit_1 + '</td>' + '<td colspan=2>' + 'Total' + "  -  " + glbCredit_2 + '</td>' + '</tr>';
                                text += '</table>';

                                //signatures
                                text += '<br>';
                                text += '<table class="table table-borderless" >';
                                text += '<tr><td colspan=2 class="text-center">________________________</td><td colspan=2></td><td colspan=2 class="text-center">________________________</td></tr>';
                                text += '<tr><td colspan=2 class="text-center">Student\'s signature</td><td colspan=2 class="text-center">________________________</td><td colspan=2 class="text-center">Course Adviser\'s signature</td></tr>';
                                text += '<tr><td colspan=2></td><td colspan=2 class="text-center">Dean\'s Signature</td><td colspan=2></td></tr>';                     
                                text += '</table>';

                                //buttons
                                text += ('<p>Print this slip and submit it to your Course Adviser.</p>');
                                text += '<p class = "text text-info" hidden>Form Saved successfully! You can continue filling the form and submit later</p>';
                                text += '<p class = "text text-info" id ="infoSubmited" hidden>Form Submitted successfully!</p>';
                                text += '<div id="previewButtons">';
                                    //todo if (data.submitted) editbutton.hidden = true
                                text += '<button class="btn btn-primary btn-lg btn-block"  type="button" id="btnEdit" onclick="editReg()"> Edit Form </button>';
                                text += '<button class="btn btn-primary btn-lg btn-block"  type="button" id="printForm" onClick="doPrintPDF();">Print Form</button> <br>';
                                text += '<button class="btn btn-success btn-lg btn-block" id="btnFinalSubmit" type="button" onclick="finalSubmit()">Submit to Course Adviser (Cannot be Undone)</button>';
                                text += '</div>';
                                //$("#regForm").html("<div id='message'></div>");

                                glb_table_data = []; // Creating a new array object
                                glb_table_data['matno'] = data[0].matno; // Setting the attribute a to 200
                                glb_table_data['student_surname'] = data[0].student_surname; // Setting the attribute b to 300


                                $("#td_matno").html(data[0].matno);
                                $("#td_firstname").html(data[0].student_firstname);
                                $("#td_othernames").html(data[0].other_names);
                                $("#td_surname").html(data[0].student_surname);
                                $("#td_level").html(data[0].level);
                                $("#td_phone").html(data[0].phone);
                                $("#td_gender").html(data[0].gender);
                                $("#td_department").html(selDept);
                                $("#td_mode").html(data[0].mode_of_entry);
                                $("#td_courses1").html(strCourses1);
                                $("#td_total1").html("Total - " + glbCredit_1);
                                
                                $("#td_courses2").html(strCourses2);
                                $("#td_total2").html("Total - " + glbCredit_2);
                                
                                $("#message_print_all").removeAttr("hidden");
                                $("#regForm").hide();
                                $("#message")
                                    .html('<h2 class="text-center">Online Departmental Course Registration</h2>')
                                    .append("<p></p>")

                                    .append(text)
                                    .hide()
                                    .fadeIn(1500, function () {
                                        $("#message").append(
                                        "<p><a  href='https://edla4eva.github.io/forms/reg.html'>Back to Registration </a></p>" );
                                    });
                            },
                            error: function (data) {
                                console.log(data);
                                alert("An error occured fetching data \n" + data.responseJSON.message);
                            }
                });
                //console.log(data); //no need to do this again

            },
            error: function (data) {
                console.log(data);
                alert("An error occured posting data\n" + data.responseJSON.message);

            }
        });


        });



function autoTablePDF(){
    const doc = new jsPDF()

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    autoTable(doc, { html: '#message_print' })

    // Or use javascript directly:
    autoTable(doc, {
    head: [['Name', 'Email', 'Country']],
    body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
        // ...
    ],
    })

    doc.save('table.pdf')
}

function jsPDFTable(){
    const doc = new jsPDF({
    orientation: "p", //set orientation
    unit: "pt", //set unit for document
    format: "letter" //set document standard
    });

    
    const data1 = 'Type/Type',
        data2 = 'asidghalwkghuahewlgauhlwegnva',
        status = 'STATUS',
        creator = 'James Dean',
        date = new Date();
    const sizes = {
    xs: 10, 
    sm : 14, 
    p: 16, 
    h3: 18, 
    h2: 20, 
    h1: 22
    };
    const fonts = {
    times: 'Times', 
    helvetica: 'Helvetica'
    };
    const margin = 0.5; // inches on a 8.5 x 11 inch sheet.
    const verticalOffset = margin;
    var columns = [
        {title: "COL1", dataKey: "col1"},
        {title: "COL2", dataKey: "col2"}, 
        {title: "COL3", dataKey: "col3"},
        {title: "COL4", dataKey: "col4"}
    ];
    var rows = [
    {
        "col1": status, 
        "col2": `${data1}\n${data2}`, 
        "col3": creator, 
        "col4": date.getUTCDate()
    },
        {
        "col1": "data-cell_r2_c1", 
        "col2": "data-cell_r2_c2", 
        "col3": "data-cell3_r2_c3", 
        "col4": "data-cell4_r2_c4"
    },
        {
        "col1": "data-cell_r3_c1", 
        "col2": "data-cell_r3_c2", 
        "col3": "data-cell3_r3_c3", 
        "col4": "data-cell4_r3_c4"
    }
    ];


    const name = "CourseReg";
    doc.autoTable(columns, rows, {
        styles: {
            fillColor: [51,51,51],
            lineColor: 240, 
            lineWidth: 1,
        },
        columnStyles: {
            col1: {fillColor: false},
            col2: {fillColor: false},
            col3: {fillColor: false},
            col4: {fillColor: false},
            col5: {fillColor: false},
            col6: {fillColor: false},        
        },
        margin: {top: 60},
        addPageContent: function(data) {
            doc.text("", 40, 30);
        }
    });
    doc.save(`${name}.pdf`);



    //Things to keep for later
    // doc.addImage(url, type, x, y, w, h);
    // const lines = doc.splitTextToSize(<insert string>, 5, {
    //   fontSize: 10,
    //   fontStyle: "normal",
    //   fontName: "helvetica"
    // });
    //console.log(doc.getFontList()) //logs a list of fonts available
}


    // function convertFormToJSON(form) {
    //     const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
    //     const json = {};
    //     $.each(array, function () {
    //     json[this.name] = this.value || "";
    //     });
    //     return json;
    // }

    // AJAX for posting json
    // $("#regForm").on("submit", function (e) {
    //     e.preventDefault();
    //     const form = $(e.target);
    //     const json = convertFormToJSON(form);
    //     console.log(json);
    //     //send to backend
    //     var data = {
    //     test: $( "#test" ).val()
    //     };
    //     var options = {
    //     url: "https://www.rtps.keminsoft.site/public/index.php/api/store_reg",
    //     dataType: "text",
    //     type: "POST",
    //     data: { test: JSON.stringify( data ) }, // Our valid JSON string
    //     success: function( data, status, xhr ) {
    //         //...
    //     },
    //     error: function( xhr, status, error ) {
    //         //...
    //     }
    //     };
    //     $.ajax( options );

    //     //end send
    // });
    
    //Object { matno: "ENG12088909", student_firstname: "dfh", student_othernames: "h", student_surname: "fgh", student_dept_idr: "1", dept_idr: "1", status: "Succ", year_of_entry: "44", session_idr_of_entry: "323", mode_of_entry: "ume", … }


    //AJAX for posting json
    //   $(document).ready( function() {
    //     $.ajax({
    //         type: 'POST',
    //         url:  'https://www.rtps.keminsoft.site/public/index.php/api/store_reg',  //evaluates to ->svr/model.php?parent_idr<6'
    //         data: {'parent_idr' : '0'},
    //         dataType: 'json',
    //         cache: false,
    //         success: function(result) {
            
    //             console.log('Hey!' + JSON.stringify(result));
    //             var dR;
    //             dR= JSON.stringify(result);
    //             dR.replace(/\s+/g,'');
    //             alert("success");
    //             // var Html = "<div id='myDivWM'>Copyright Obadan Family</div>";
    //             // $("body").append(Html);
                
    //         },
    //     });
    //   });

    
