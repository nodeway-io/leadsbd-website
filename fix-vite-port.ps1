# fix-vite-port.ps1
# Kills any process using port 5173 and starts Vite dev server

$port = 5173
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($connections) {
    foreach ($conn in $connections) {
        $processId = $conn.OwningProcess
        $processName = (Get-Process -Id $processId -ErrorAction SilentlyContinue).ProcessName
        Write-Host "Killing process '$processName' (PID: $processId) on port $port..." -ForegroundColor Yellow
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 1
    Write-Host "Port $port is now free." -ForegroundColor Green
} else {
    Write-Host "Port $port is already free." -ForegroundColor Green
}

Write-Host "Starting Vite dev server..." -ForegroundColor Cyan
npm run dev
