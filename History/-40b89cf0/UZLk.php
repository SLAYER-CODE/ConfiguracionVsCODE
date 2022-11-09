<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Pdf2text\Pdf2text;

include '../Controllers/Module/Pdf2Text.php';

class ControllerPDF extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function ReadDocument(string $var = null)
    {
        $pdf = $var;
        $pdf2text = new Pdf2text($pdf);        
        $output = $pdf2text -> decode();
        var_dump($output);
        
    }
}
