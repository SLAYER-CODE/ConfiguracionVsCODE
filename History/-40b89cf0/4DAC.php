<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ControllerPDF extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function ReadDocument(Type $var = null)
    {
        # code...
    }
}
