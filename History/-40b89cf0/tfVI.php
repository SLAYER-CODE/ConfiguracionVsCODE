<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

include '../Controllers/Module/Pdf2Text.php';

class ControllerPDF extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function ReadDocument(string $var = null)
    {
        $pdf = $var
        $pdf2text = new         
    }
}
