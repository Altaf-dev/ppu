<?php

/**
 * Флаг включает вывод дополнительной информации в ответе при отправке лида в битрикс.
 */
$bitrixLeadDebug = false;

/**
 * Class BitrixLead
 *
 * Информация о битрикс лиде.
 */
class BitrixLead
{
    var $firstName;
    var $lastName;
    var $email;
    var $phone;
    var $comment;
    var $utmSource;
    var $utmMeduim;
    var $utmCompaign;
    var $utmContent;
    var $utmTerm;
    var $yclid;
    var $gclid;
    var $pm_position;
    var $keyword;
    var $fileTmpName;
    var $fileName;
    var $title;
    var $clientid;
    var $googlecid;
    var $sourceID;

}

/**
 * Class BitrixLeadSender
 *
 * Отправитьель информации о лиде в систему CRM Bitrix.
 */
class BitrixLeadSender
{

    /**
     * @var string адрес скрипта для отправки лида в Bitrix.
     */
    private $queryUrl;

    /**
     * BitrixLeadSender constructor.
     *
     * @param string $queryUrl - адрес hook срипта для отправки лида в Bitrix.
     */
    public function __construct(string $queryUrl)
    {
        $this->queryUrl = $queryUrl;
    }

    /**
     * Выполняет отрпавку информации о новом лиде.
     *
     * @param $lead - информация о лиде.
     * @return bool - true если данные отправились, false в противном случае.
     */
    function send(BitrixLead $lead): bool
    {
        global $bitrixLeadDebug;

        $url = $lead->fileTmpName;
        $data = file_get_contents($url);
        $base64 = base64_encode($data);
        $name = urldecode($lead->fileName);

        $queryData = http_build_query(array(
            'fields' => array(
                "TITLE" => $lead->title,
                "NAME" => $lead->firstName,
                "LAST_NAME" => $lead->lastName,
                "STATUS_ID" => "NEW",
                "OPENED" => "Y",
                "ASSIGNED_BY_ID" => 1,
                "UF_CRM_1607323239" => $lead->yclid,
                "UF_CRM_1607323307" => $lead->gclid,
                "UF_CRM_1607327450" => $lead->pm_position,
                "UF_CRM_1607327462" => $lead->keyword,
                "UF_CRM_1607323275" => $lead->clientid,
                "UF_CRM_1607323325" => $lead->googlecid,
                "UF_CRM_1707925044048" => ['fileData' => [$name, $base64]],
                "UTM_SOURCE" => $lead->utmSource,
                "UTM_MEDIUM" => $lead->utmMeduim,
                "UTM_CAMPAIGN" => $lead->utmContent,
                "UTM_CONTENT" => $lead->utmSource,
                "UTM_TERM" => $lead->utmTerm,
                "SOURCE_ID" => $lead->sourceID,
                "PHONE" => array(array("VALUE" => $lead->phone, "VALUE_TYPE" => "WORK")),
                "EMAIL" => array(array("VALUE" => $lead->email, "VALUE_TYPE" => "WORK")),
            ),
            'params' => array("REGISTER_SONET_EVENT" => "Y")
        ));

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $this->queryUrl,
            CURLOPT_POSTFIELDS => $queryData,
        ));

        $result = curl_exec($curl);
        curl_close($curl);

        $result = json_decode($result, 1);
        if ($bitrixLeadDebug) {
            print_r($result);
        }

        if (array_key_exists('error', $result)) {
            error_log($result['error_description']);
            return false;
        } else {
            return true;
        }
    }

}
?>