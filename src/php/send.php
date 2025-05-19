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
$lead->title = $_POST['name'];
$lead->firstName = $_POST['name'];
$lead->lastName = "";
$lead->phone = $_POST['phone'];
$lead->email = $_POST['email'];
$lead->comment = $_POST["comment"];
$lead->contact = $_POST["contact"];
$lead->utmSource = $_POST["utm_source"];
$lead->utmMeduim = $_POST["utm_meduim"];
$lead->utmCompaign = $_POST["utm_compaign"];
$lead->utmContent = $_POST["utm_content"];
$lead->utmTerm = $_POST["utm_term"];
$lead->yclid = $_POST["yclid"];
$lead->gclid = $_POST["gclid"];
$lead->position = $_POST["position"];
$lead->keyword = $_POST["keyword"];


if (isset($_FILES['myfile']['name'][0])) {
    $lead->fileTmpName = $_FILES['myfile']['tmp_name'];
    $lead->fileName = $_FILES['myfile']['name'];
}
/*
 * Отправляем лида в bitrix.
 */
// $leadSender = new BitrixLeadSender("https://snabprom.bitrix24.kz/rest/1/7imsxs12tsk84fer/crm.lead.add.json");
$leadSender = new BitrixLeadSender("https://b24-zbtb6g.bitrix24.ru/rest/1/1yt9gof6dr4scsaa/crm.lead.add.json");
// $leadSender = new BitrixLeadSender("https://snabprom.bitrix24.kz/rest/1/23b5cb2hc6akfhwa/crm.lead.add.json");
// $leadSender = new BitrixLeadSender("https://b24-zbtb6g.bitrix24.ru/rest/1/1yt9gof6dr4scsaa/crm.lead.add.json");


if ($leadSender->send($lead)) {
    echo "Лид отпрален успешно";
    http_response_code(200);
} else {
    echo "Error";
    http_response_code(400);
}
?>