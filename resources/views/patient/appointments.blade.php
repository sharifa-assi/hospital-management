<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Appointments</title>
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
                    <div class="card-header">Your Appointments</div>
                    <div class="card-body">
                        <ul>
                            <li>April 30 – Dr. Amina Rahal at 10:00 AM</li>
                            <li>May 5 – Dr. Fadi Youssef at 2:00 PM</li>
                            <li>May 12 – Dr. Sara Mansour at 11:30 AM</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
