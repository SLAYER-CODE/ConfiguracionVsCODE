<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ControllerPDF extends BaseController
{
include '../Controllers/Module/Pdf2Text.php'
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function ReadDocument(string $var = null)
    {
        
    }
}
