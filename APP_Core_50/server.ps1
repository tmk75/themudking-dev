param([int]$port = 8000)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Listening on port $port..."

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $url = $request.Url.LocalPath
    if ($url -eq '/' -or $url -eq '') { $url = '/core50_framework.html' }

    $path = Join-Path (Get-Location) $url.TrimStart('/')

    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllBytes($path)
        $extension = [System.IO.Path]::GetExtension($path)
        if ($extension -eq '.html') { $response.ContentType = 'text/html' }
        elseif ($extension -eq '.css') { $response.ContentType = 'text/css' }
        elseif ($extension -eq '.js') { $response.ContentType = 'application/javascript' }
        else { $response.ContentType = 'application/octet-stream' }

        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $content = [Text.Encoding]::UTF8.GetBytes("File not found")
        $response.OutputStream.Write($content, 0, $content.Length)
    }

    $response.Close()
}

$listener.Stop()