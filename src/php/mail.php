<?php

session_start();
require_once "bitrix_lead_send.php";

if (!isset($_POST['phone'])) {
    return;
}

/*
 * Формируем информацию о лиде.
 */
$lead = new BitrixLead();
$lead->title = $_POST['event'];
$lead->firstName = $_POST['name'];
$lead->lastName = "";
$lead->phone = $_POST['phone'];
$lead->email = $_POST["email"];
$lead->comment = $_POST["comment"];
$lead->utmSource = $_POST["utm_source"];
$lead->utmMeduim = $_POST["utm_meduim"];
$lead->utmCompaign = $_POST["utm_compaign"];
$lead->utmContent = $_POST["utm_content"];
$lead->utmTerm = $_POST["utm_term"];
$lead->yclid = $_POST["yclid"];
$lead->gclid = $_POST["gclid"];
$lead->pm_position = $_POST["pm_position"];
$lead->keyword = $_POST["keyword"];
$lead->clientid = $_POST["clientid"];
$lead->googlecid = $_POST["googlecid"];
$lead->sourceID = $_POST["sourceID"];

if (isset($_FILES['userfile'])) {
    $lead->fileTmpName = $_FILES['userfile']['tmp_name'];
    $lead->fileName = $_FILES['userfile']['name'];
}

/*
 * Отправляем лида в Битрикс
 */
 //https://glazolik.bitrix24.kz/rest/9/uq7faswfpqwf1dwu/
$leadSender = new BitrixLeadSender("https://glazolik.bitrix24.kz/rest/9/uq7faswfpqwf1dwu/crm.lead.add.json");
if ($leadSender->send($lead)) {
    echo "Ok";
    http_response_code(200);
} else {
    echo "Error";
    http_response_code(400);
}

?>