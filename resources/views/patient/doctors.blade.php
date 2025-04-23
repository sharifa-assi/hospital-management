<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Doctors</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

    @include('partials.navbar')

    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-3">
                @include('partials.sidebar')
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">Your Doctors</div>
                    <div class="card-body">
                        <ul>
                            <li>Dr. Amina Rahal – Cardiologist</li>
                            <li>Dr. Fadi Youssef – General Practitioner</li>
                            <li>Dr. Sara Mansour – Dermatologist</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
