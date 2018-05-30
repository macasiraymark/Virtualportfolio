<?php
 function fetch_data()
 {
      $output = '';
      $connect = mysqli_connect("localhost", "root", "", "db_virtualportfolio");
      $sql = "SELECT * FROM tbl_accounts ORDER BY userid ASC";
      $result = mysqli_query($connect, $sql);
      while($row = mysqli_fetch_array($result))
      {
      $output .= '<tr>
                          
                          <td>'.$row["firstname"].'</td>
                          <td>'.$row["middlename"].'</td>
                          <td>'.$row["lastname"].'</td>
                          <td>'.$row["contactnumber"].'</td>
                          <td>'.$row["address"].'</td>
                          <td>'.$row["municipality"].'</td>
                     </tr>
                          ';
      }
      return $output;
 }
 if(isset($_POST["create_pdf"]))
 {
      require_once('./assets/TCPDF/tcpdf/tcpdf.php');
      $obj_pdf = new TCPDF('P', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
      $obj_pdf->SetCreator(PDF_CREATOR);
      $obj_pdf->SetTitle("Department of Agriculture REGION II Reports");
      $obj_pdf->SetHeaderData('', '', PDF_HEADER_TITLE, PDF_HEADER_STRING);
      $obj_pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
      $obj_pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
      $obj_pdf->SetDefaultMonospacedFont('helvetica');
      $obj_pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
      $obj_pdf->SetMargins(PDF_MARGIN_LEFT, '5', PDF_MARGIN_RIGHT);
      $obj_pdf->setPrintHeader(false);
      $obj_pdf->setPrintFooter(false);
      $obj_pdf->SetAutoPageBreak(TRUE, 10);
      $obj_pdf->SetFont('helvetica', '', 12);
      $obj_pdf->AddPage();
      $content = '';
      $content .= '
      <h3 align="center">Department of Agriculture REGION II Reports</h3><br /><br />
      <table border="1" cellspacing="0" cellpadding="5">
           <tr>
                
                <th width="16%" style="font-weight:bold;">First Name</th>
                <th width="16%" style="font-weight:bold;">Middle Name</th>
                <th width="16%" style="font-weight:bold;">Last Name</th>
                <th width="16%" style="font-weight:bold;">Contact Number</th>
                <th width="16%" style="font-weight:bold;">Address</th>
                <th width="16%" style="font-weight:bold;">Municipality</th>
           </tr>
      ';
      $content .= fetch_data();
      $content .= '</table>';
      $obj_pdf->writeHTML($content);
      $obj_pdf->Output('Accounts-Reports.pdf', 'I');
 }
 ?>

 <!DOCTYPE html>
 <html>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="./assets/lib/materialize/css/materialize.min.css" media="screen,projection">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <head>
        <link rel="shortcut icon" href="./assets/img/da-logo.png" type="image/x-icon">
           <title>Export Reports</title>

          </head>
       

      <body>
           <br /><br />
           <div class="container">
                <h1 align="center">Export Accounts Records</h1><br />
                <div class="z-depth-1">
                     <table class="responsive-table bordered highlight">
                          <tr>
                               
                               <th>First Name</th>
                               <th>Middle Name</th>
                               <th>Last Name</th>
                               <th>Contact</th>
                               <th>Address</th>
                               <th>Municipality</th>
                          </tr>
                     <?php
                     echo fetch_data();
                     ?>
                     </table>
                     <br />

                     <form method="post">
                        <a href="accounts.php" class="btn waves-effect waves-light">Back to Accounts<i class="material-icons left">arrow_back</i></a>
                        <button class="btn waves-effect waves-light" type="submit" name="create_pdf">Export to PDF <i class="material-icons right">picture_as_pdf</i></button>
                        
                     </form>
                </div>
           </div>
      </body>
      <script type="text/javascript" src="./lib/jquery-3.1.1.min.js"></script>
      <script type="text/javascript" src="./assets/materialize/js/materialize.min.js"></script>
 </html>
