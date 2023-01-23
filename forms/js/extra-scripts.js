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

    
