        // Function to get URL parameter by name
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        function getUrlParameters(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
          }

          //usage
        //   var session = getUrlParameters('session');
        //   var level = getUrlParameters('level');
          
        //   // Now 'session' and 'level' variables contain the values of the parameters
        //   console.log('Session: ' + session);
        //   console.log('Level: ' + level);

        function removeCourse(semester, glbCredit_n) {
            if(semester==1){
                var rows = document.getElementsByName('mytext_1[]');
                var Course_Code_Input =$("#CourseCode_1");
            } else{
                var rows = document.getElementsByName('mytext_2[]');
                var Course_Code_Input =$("#CourseCode_2");
            }
                
            var selectedRows = [];
            // $(wrapper_2).append('<div class="input-group mb-3">
            //<input placeholder="Enter Course Code" type="text" id="mytext_2[]" 
            //name="mytext_2[]" class="form-control" value="'+ dValue_2 + '">
            //<div class="input-group-append"><button class="btn btn-danger mb-0 mt-1 ml-1 
            //remove_field_2" type="button">Remove</button></div></div>'); //add input box
            Course_Code_Input.val("" ); //clear it
            for (var i = 0, l = rows.length; i < l; i++) {

                if (!rows[i].value=="") {
                    selectedRows.push(rows[i]);
                }

                //compute credits
                console.log("In remove course Computing credit for "+ rows[i].value);
                // glbCredit = glbCredit - getCredit(rows[i].value);
                // if(semester==1) glbCredit_1 = glbCredit_1 - getCredit(rows[i].value);
                // else glbCredit_2 = glbCredit_2 - getCredit(rows[i].value);
                // console.log("Total Credits "+ glbCredit);

                glbCredit_n = glbCredit_n - getCredit(rows[i].value);
                console.log("Sem. Credits "+ glbCredit_n);
                console.log("In fxn Total. Credits "+ parseInt($('#glbCredits').val()));
                //$('#glbCredits')

                var prevValue = Course_Code_Input.val( );
                if (prevValue==""){
                    Course_Code_Input.val(  rows[i].value );
                }else{
                    Course_Code_Input.val( prevValue + ";" + rows[i].value  ); //change value                        
                }
            }
            return glbCredit_n;
        }
        
        // function removeCourse_1() {
        //         var rows_1 = document.getElementsByName('mytext_1[]');
        //         var selectedRows = [];

        //         $("#CourseCode_1").val("" ); //clear it
        //         for (var i = 0, l = rows_1.length; i < l; i++) {
        //             if (!rows_1[i].value=="") {
        //                 selectedRows.push(rows_1[i]);
        //             }

        //             var prevValue_1 = $("#CourseCode_1").val( );
        //             if (prevValue_1==""){
        //                 $("#CourseCode_1").val(  rows_1[i].value );
        //             }else{
        //                 $("#CourseCode_1").val( prevValue_1 + ";" + rows_1[i].value  ); //change value                        
        //             }
        //         }
        // }
        
        // function removeCourse_2() {

        //         var rows = document.getElementsByName('mytext_2[]');
        //         var selectedRows = [];

        //         $("#CourseCode_2").val("" ); //clear it
        //         for (var i = 0, l = rows.length; i < l; i++) {
        //             if (!rows[i].value=="") {
        //                 selectedRows.push(rows[i]);
        //             }

        //             var prevValue_2 = $("#CourseCode_2").val( );
        //             if (prevValue_2==""){
        //                 $("#CourseCode_2").val(  rows[i].value );
        //             }else{
        //                 $("#CourseCode_2").val( prevValue_2 + ";" + rows[i].value  ); //change value                        
        //             }
        //         }
        // }
             
        function PopulateDropDownList(limits, offset) {
            //load combos
            $("#btnGenerate").attr("disabled", "true");
            var courses_1 = [
                { course_code: "CPE211", course_title: "CPE211-Title", course_unit: 3},
                { course_code: "CPE311", course_title: "CPE311", course_unit: 3},
                { course_code: "CPE321", course_title: "CPE321", course_unit: 3 },
                { course_code: "CPE481", course_title: "CPE481", course_unit: 3}
            ];
            var courses_2 = [
                { course_code: "CPE212", course_title: "CPE212-Title", course_unit: 3},
                { course_code: "CPE313", course_title: "CPE313" , course_unit: 3},
                { course_code: "CPE82", course_title: "CPE82", course_unit: 3},
                { course_code: "CPE572", course_title: "CPE572", course_unit: 3}
            ];
                // using the ajax() method directly to get data for comco
                $.ajax({
                    type: "POST",
                    url: url_global + "get_table/courses/"+ limits +"/"+ offset,
                    data: {},
                    dataType: "json",
                    encode: true,
                    }).done(function (data) {
                        courses_1=data;
                        courses_2=data;
                        glb_Courses =data;

                        fillcomboWithReturnedData(data, true);
                        console.log(data);
                        console.log("glb_Courses");
                        console.log(glb_Courses);
                        $("#btnGenerate").removeAttr("disabled");
                    });
            
        }
        function findElement(arr, propName, propValue) {
            for (var i=0; i < arr.length; i++)
                if (arr[i][propName] == propValue)
                return arr[i];

            // will return undefined if not found; you could return a default instead
        }

        function getCredit(paramCourse){

            //var dCredit = glb_Courses.find(paramCourse).course_unit;
            var x = findElement(glb_Courses, "course_code", paramCourse); // todo: causes error x is undefined
            console.log('finding ' + paramCourse);
            console.log(x);
            //console.log(glb_Courses);
            //alert(x["course_unit"]); // displays "hi"
            if (x==undefined){
                dCredit=0;
            }else{
                dCredit = x["course_unit"];
            }


            if (dCredit==undefined){
                dCredit=0;
            }
            return dCredit
        }
        function fillcomboWithReturnedData(courses_1, clearPrevious){
            //first clear all courses
            if (clearPrevious){
                $("#CourseCode_1").val(  "");
                $("#CourseCode_2").val(  "");
            }


            //<select id="comboCourses_1"></select>
            $("#comboCourses_1").empty();
            $("#comboCourses_2").empty();
 
            var comboCourses_1 = $("#comboCourses_1");
            var comboCourses_2 = $("#comboCourses_2");
            $(courses_1).each(function () {
                
                var option = $("<option />");
                //Set course_title in Text part.
                option.html(this.course_code + "-" + this.course_title + " (" + this.course_unit + ")");
 
                //Set  course_code in Value part.
                option.val(this.course_code);
 
                //Add the Option element to DropDownList.
                if(this.course_semester=="1") comboCourses_1.append(option);
                if(this.course_semester=="2") comboCourses_2.append(option);
                //comboCourses_1.append(option);
                //comboCourses_2.append(option);
            });
        }

        function load_returnd_records_into_fields(data) {
            var frm = $("#regForm");
            var i;

            console.dir(data);      // for debug

            for (i in data) {
                console.log(i); 
                frm.find('[name="' + i + '"]').val(data[i]);
                for (field in data[i]) {
                    console.log(data[i][field]); 
                    frm.find('[name="' + field + '"]').val(data[i][field]);
                }
            }

            frm.show();
            $("#continueRegDiv").show();
            
        }
  
        //todo: validations
        function validateUsername() {
            let usernameValue = $("#usernames").val();
            if (usernameValue.length == "") {
              $("#usercheck").show();
              usernameError = false;
              return false;
            } else if (usernameValue.length < 3 || usernameValue.length > 10) {
              $("#usercheck").show();
              $("#usercheck").html("**length of username must be between 3 and 10");
              usernameError = false;
              return false;
            } else {
              $("#usercheck").hide();
            }
        }
         
          // Validate Email
        function validateMatNo() {
              const matno = document.getElementById("matno");
            matno.addEventListener("blur", () => {
                //let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
                let regex = /^ENG([0-9]){2,7}$/;
                let s = matno.value;
                if (regex.test(s)) {
                matno.classList.remove("is-invalid");
                      matnoError = true;
                } else {
                matno.classList.add("is-invalid");
                      matnoError = false;
                }
              });
        }

        function doPrint(){
            printJS({ printable: 'regForm', type: 'html', header: 'Online Course Registration (c)2023' });
        }

        function doPrintPDF() {
            urlPDFCloud = 'https://www.rtps.keminsoft.site/public/index.php/api/';
            urlPDFLocal = 'http://localhost/rtps/web/back-end/public/index.php/api/';
            urlPDF = urlPDFCloud;
            $(previewButtons).hide();
            var pdf = new jsPDF('p', 'pt', 'letter');
            var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
            var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
            var fontSize = 14;
            var startHeight = 150;

            // Header
            let strH = "LATE REGISTRATION FORM";
            pdf.setTextColor(100);
            pdf.setFontSize(18);
            pdf.text(strH, pageWidth / 2, 40, {align: 'center'});
            
            pdf.text("UNIVERSITY OF BENIN, FACULTY OF ENGINEERING", pageWidth / 2, 60, {align: 'center'});
            pdf.text("EXAMINATION COURSE REGISTRATION FORM " + $("#td_session").html(), pageWidth / 2, 80, {align: 'center'});

            //low performance
            var img = new Image()
            //img.src = '../images/usr.jpg'
            try{
                img.src  = urlPDF + 'jpg/' + $("#td_matno").html();
                pdf.addImage(img, 'jpg', pageWidth-160, startHeight-fontSize, 100, 100);
            }catch(err){
                img.src = '../images/usr.jpg';
                pdf.addImage(img, 'jpg', pageWidth-160, startHeight-fontSize, 100, 100);
            }

            //end header

            //content
            let strC = "TEMP VAL";
            pdf.setTextColor(100);
            pdf.setFontSize(14);
                    

            pdf.text("MAT. NO.:", 80, startHeight-(fontSize*1), {align: 'left'});
            pdf.text($("#td_matno").html(), 300, startHeight-(fontSize*1), {align: 'left'}); //val

            pdf.text("SURNAME:", 80, startHeight+(fontSize*1), {align: 'left'});
            pdf.text($("#td_surname").html(), 300, startHeight+(fontSize*1), {align: 'left'}); //val

            pdf.text("FIRST NAME:", 80, startHeight+(fontSize*3), {align: 'left'});
            pdf.text($("#td_firstname").html(), 300, startHeight+(fontSize*3), {align: 'left'}); //val

            pdf.text("OTHER NAMES:", 80, startHeight+(fontSize*5), {align: 'left'});
            pdf.text($("#td_othernames").html(), 300, startHeight+(fontSize*5), {align: 'left'}); //val

            pdf.text("DEPARTMENT:", 80, startHeight+(fontSize*7), {align: 'left'});
            pdf.text($("#td_department").html(), 300, startHeight+(fontSize*7), {align: 'left'});

            pdf.text("MODE OF ENTRY:", 80, startHeight+(fontSize*9), {align: 'left'});
            pdf.text($("#td_mode").html(), 300, startHeight+(fontSize*9), {align: 'left'}); //val

            pdf.text("PHONE NO.:", 80, startHeight+(fontSize*11), {align: 'left'});
            pdf.text($("#td_phone").html(), 300, startHeight+(fontSize*11), {align: 'left'}); //val

            pdf.text("GENDER:", 80, startHeight+(fontSize*13), {align: 'left'});
            pdf.text($("#td_gender").html(), 180, startHeight+(fontSize*13), {align: 'left'}); //val

            pdf.text("LEVEL:", 300, startHeight+(fontSize*13), {align: 'left'});
            pdf.text($("#td_level").html(), 380, startHeight+(fontSize*13), {align: 'left'}); //val

            pdf.setLineWidth(0.5);
            pdf.line(80, startHeight+(fontSize*14), pageWidth-80, startHeight+(fontSize*14)); //x1,y1,x2,y2

            //---courses
            pdf.text("FIRST SEMESTER", 80, startHeight+(fontSize*16), {align: 'left'});
            pdf.text("SECOND SEMESTER", 300, startHeight+(fontSize*16), {align: 'left'}); //val
            
            pdf.line(80, startHeight+(fontSize*17), pageWidth-80, startHeight+(fontSize*17)); //x1,y1,x2,y2

            pdf.text($("#td_courses1").html(), 80, startHeight+(fontSize*19), {align: 'left'});
            pdf.text($("#td_courses2").html(), 300, startHeight+(fontSize*19), {align: 'left'}); //val
        
            pdf.line(80, pageHeight-160-fontSize, pageWidth-80, pageHeight-160-fontSize); //x1,y1,x2,y2
            pdf.text($("#td_total1").html(), 80, pageHeight  - 160 + fontSize, {align: 'left'});
            pdf.text($("#td_total2").html(), 300, pageHeight  - 160 + fontSize, {align: 'left'}); //val
            pdf.line(80, pageHeight-160+fontSize*2, pageWidth-80, pageHeight-160+fontSize*2); //x1,y1,x2,y2
        
        //sign
            pdf.line(80, pageHeight-100, 220, pageHeight-100); //x1,y1,x2,y2
            pdf.text("Course Adviser\'s Sign", 80, pageHeight  - 100 + fontSize, {align: 'left'});
            
            pdf.line(400, pageHeight-100, 550, pageHeight-100); //x1,y1,x2,y2
            pdf.text("Student\'s Sign", 420, pageHeight  - 100 + fontSize, {align: 'left'}); //val
        
            pdf.line(200,pageHeight  - 60, pageWidth-200, pageHeight  - 60); //x1,y1,x2,y2
            pdf.text("Dean\'s Sign",  pageWidth / 2,  pageHeight  - 60+ fontSize, {align: 'center'}); //val
        
        


            //end content

            // FOOTER
            

            let str = "RTPS Online Registration Software (eddie.olaye@gmail.com) " + Date();
            pdf.setTextColor(100);
            pdf.setFontSize(10);
            pdf.text(str, pageWidth / 2, pageHeight  - 10, {align: 'center'});
            //end footer

            // source can be HTML-formatted string, or a reference to...
            source = $('#message_print')[0];

            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left+20, // x coord
            margins.top+100, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('onlineCourseRegistration.pdf');
            }, margins);
        }

        async function saveFile(url){

            let formData = new FormData();
            var dFile =  $("#file_pix").get(0).files;
            formData.append('file_pix', dFile[0]);
            await fetch(url, {method: "POST", body: formData});
        }

        function initializeFormView(){
            $("#regForm").hide();
            $("#message_print_all").hide();
            
            $("#continueRegDiv").hide();

        }
        function startRegView(){

            $("#btnContinue").attr("disabled","true"); 
            $("#regForm").show(); 
            $("#topButtonsDiv").hide(); 
            $("#continueRegDiv").hide();
        }
        function continueRegView(){
            $("#continueRegDiv").show();
        }
        function previewRegForm(){
            $("#message_print_all").show();
            $(btnFinalSubmit).show();
            $("#regForm").hide();
        }
        function editReg(){

            //method 1
            //$(btnEdit).hide();
            $(btnFinalSubmit).hide();
            $(message_print_all).hide();
            $(regForm).show();


            //method 2
            //location.reload();
            //clear all courses so that student must restart
            // $("#CourseCode_1").val(  "");
            // $("#CourseCode_2").val(  "");
        }

        //last
        $(document).ready(function() {
            // Get the 'session' parameter from the URL
            var sessionParameter = getUrlParameter('session');

            // Fill the input element with the session parameter value
            $('#session_idr').val(sessionParameter);
        });