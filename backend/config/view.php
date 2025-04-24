<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Here you may specify an array of paths that should be checked for your
    | views. Laravel will search the given paths for the views that are
    | returned by the `view()` function.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. You may change this if you wish to store the compiled
    | views elsewhere.
    |
    */

    'compiled' => realpath(storage_path('framework/views')) ?: storage_path('framework/views'),

];
