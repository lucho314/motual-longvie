<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <title>React Tailwind CSS Dashboard - Flowbite</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <body class="bg-gray-50 dark:bg-gray-900">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div id="root"></div>
    @viteReactRefresh
    @vite('resources/js/index.tsx')
  </body>
</html>
