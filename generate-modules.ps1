$modules = @("patients", "doctors", "departments", "appointments", "schedules", "medical-records", "prescriptions", "medicines", "laboratory", "admissions", "beds", "billing", "notifications", "reports")

foreach ($mod in $modules) {
    npx @nestjs/cli g module $mod --no-spec
    npx @nestjs/cli g service $mod --no-spec
    npx @nestjs/cli g controller $mod --no-spec
}
