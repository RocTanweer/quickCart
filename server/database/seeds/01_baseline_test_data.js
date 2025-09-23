/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Delete existing data respecting foreign keys
  await knex("order_line").del();
  await knex("shop_order").del();
  await knex("shopping_cart_item").del();
  await knex("shopping_cart").del();
  await knex("payment").del();
  await knex("address").del();
  await knex("product").del();
  await knex("product_brand").del();
  await knex("product_category").del();
  await knex("user").del();

  // Users
  await knex("user").insert([
    {
      user_id: 1,
      name: "Roc Tanweer",
      email: "roc@admin.com",
      password: "$2b$10$c8HKw1IpjR0oqZXwpCoUhe5R.LByeNQJCe3xaj.2Aic1ypObIcV1C",
      profile_image: "https://google.com",
      role: "ADMIN",
    },
    {
      user_id: 55,
      name: "Tanweer",
      email: "roc@user.com",
      password: "$2b$10$YLQf0fNf5R0J.yXvFwr.AOWK3Ki1xck1CV5dHVxJtq6gYix8USLdm",
      profile_image: "https://google.com",
      role: "USER",
    },
  ]);

  // Product Brands
  await knex("product_brand").insert([
    { id: 24, name: "Acer" },
    { id: 15, name: "Apple" },
    { id: 18, name: "ASUS" },
    { id: 20, name: "Dell" },
    { id: 19, name: "HP" },
    { id: 21, name: "Huawei" },
    { id: 17, name: "Lenovo" },
    { id: 22, name: "Microsoft" },
    { id: 16, name: "Samsung" },
    { id: 23, name: "Xiaomi" },
  ]);

  // Product Categories
  await knex("product_category").insert([
    {
      id: 50,
      name: "Monitor",
      thumbnail: "QuickCartExpress/blmfudlolwcfum2ft17j",
    },
    {
      id: 51,
      name: "Laptop",
      thumbnail: "QuickCartExpress/bz0msv9twsessngir8hr",
    },
    {
      id: 52,
      name: "Tablet",
      thumbnail: "QuickCartExpress/dic4hkbruaeuizaoyz2s",
    },
    {
      id: 53,
      name: "Phone",
      thumbnail: "QuickCartExpress/whzdegzqiusbss6wsahv",
    },
    {
      id: 54,
      name: "Accessories",
      thumbnail: "QuickCartExpress/okwkghkryridd0h97fa0",
    },
  ]);

  // Products
  await knex("product").insert([
    {
      id: 2,
      product_category_id: 54,
      product_brand_id: 15,
      unit_price: 24898.0,
      stock_quantity: 41,
      name: "AirPods Pro (2nd generation)",
      description:
        "AirPods Pro (2nd Gen) with MagSafe Case offer 2x more noise cancellation, Adaptive Audio, and Conversation Awareness. Personalized fit with four ear tip sizes and Adaptive EQ. Up to 6 hours listening time, 30 hours with case. MagSafe Case features Precision Finding and lanyard loop. Enhanced touch controls, Announce Notifications, and Audio Sharing. Seamless connectivity with Apple devices.",
      image: "QuickCartExpress/ppycdklmfwjtsnve2p5u",
    },
    {
      id: 3,
      product_category_id: 54,
      product_brand_id: 15,
      unit_price: 9500.0,
      stock_quantity: 17,
      name: "Magic Keyboard - US English",
      description:
        "Magic Keyboard delivers a remarkably comfortable and precise typing experience. It’s also wireless and rechargeable, with an incredibly long-lasting internal battery that’ll power your keyboard for about a month or more between charges. It pairs automatically with your Mac, so you can get to work straightaway. And it includes a woven USB-C to Lightning Cable that lets you pair and charge by connecting to a USB-C port on your Mac.",
      image: "QuickCartExpress/xrmpgq4g2jcgm2t9qlwx",
    },
    {
      id: 4,
      product_category_id: 54,
      product_brand_id: 24,
      unit_price: 559.0,
      stock_quantity: 170,
      name: "Acer Wireless Mouse (Black)",
      description:
        "Get precise control with a 1600 DPI sensor in this fast-scroll wireless mouse. Enjoy freedom with a 10m working distance and 2.4 GHz frequency. Its nano receiver ensures seamless connectivity, while energy-saving features enhance longevity. Simply plug and play with a one-year warranty for peace of mind.",
      image: "QuickCartExpress/lijzva57ogofim0hghlr",
    },
    {
      id: 5,
      product_category_id: 54,
      product_brand_id: 19,
      unit_price: 771.0,
      stock_quantity: 81,
      name: "HP M270 Backlit Gaming Mouse ",
      description:
        "The HP M270 Backlit USB Wired Gaming Mouse offers adjustable DPI from 800 to 2400 for precise control. Its metal scroll wheel with backlight and 4 breathing LED lights create an immersive gaming atmosphere. With 6 customizable buttons and a 1-year limited warranty, it's a reliable choice for gaming enthusiasts.",
      image: "QuickCartExpress/zshclye8qc6qsc1kjilk",
    },
    {
      id: 6,
      product_category_id: 54,
      product_brand_id: 20,
      unit_price: 11699.0,
      stock_quantity: 25,
      name: "Dell Premier KB900",
      description:
        "The Dell Premier Collaboration Keyboard KB900 enhances productivity and collaboration with meticulous design and all-day comfort. Enjoy seamless pairing via Dell Pair for secure Bluetooth Low Energy connections. With Dell Secure Link USB Receiver, data transmission is encrypted for enhanced security. Rechargeable for long-lasting use, it's tailored to your needs for optimized performance.",
      image: "QuickCartExpress/avsefn55t6jq7neifmen",
    },
    {
      id: 7,
      product_category_id: 54,
      product_brand_id: 21,
      unit_price: 13495.0,
      stock_quantity: 11,
      name: "Huawei Watch GT 2",
      description:
        "Experience revolutionary power solutions with the HUAWEI WATCH GT series. Powered by the Kirin A1 chip and intelligent power-saving tech, enjoy up to 2 weeks of usage. Its minimalistic design features a bezel-less 3D glass face, while serving as a professional sports trainer and everyday life assistant with precise tracking and essential features like Bluetooth calling and sleep monitoring.",
      image: "QuickCartExpress/nekyyzqligu6s8oc8uce",
    },
    {
      id: 8,
      product_category_id: 53,
      product_brand_id: 15,
      unit_price: 134900.0,
      stock_quantity: 4,
      name: "iPhone 15 Pro",
      description:
        "Introducing the iPhone 15 Pro Max, with a cutting-edge camera system boasting 48MP main, 12MP ultra-wide, and 12MP telephoto lenses, enabling up to 25x optical zoom. Capture breathtaking photos and videos with Deep Fusion, Smart HDR 5, and ProRes recording. Benefit from 5G, Wi-Fi 6E, and advanced location services. Enhance communication via FaceTime with Spatial Audio and SharePlay. Siri integration facilitates effortless voice commands for diverse tasks.",
      image: "QuickCartExpress/roelfhyhmdgfpqygnsqg",
    },
    {
      id: 9,
      product_category_id: 53,
      product_brand_id: 16,
      unit_price: 139999.0,
      stock_quantity: 7,
      name: "Samsung Galaxy S24 Ultra",
      description:
        "Introducing the Galaxy S24 Ultra, boasting a titanium exterior and a 17.25cm flat display, embodying exquisite design. Reviving the legacy of the Galaxy Note, it offers precise navigation and writing capabilities. With unrivaled megapixels and AI processing, it sets the standard for image quality. Experience Circle to Search for seamless searches and elevate your gaming with the Snapdragon 8 Gen 3, featuring real-time ray tracing for immersive graphics. Victory awaits.",
      image: "QuickCartExpress/laez2lph4bcwubczdntc",
    },
    {
      id: 10,
      product_category_id: 53,
      product_brand_id: 18,
      unit_price: 94999.0,
      stock_quantity: 17,
      name: "ROG Phone 8 Pro Edition",
      description:
        "Experience the ROG Phone 6's immersive 6.78-inch FHD+ AMOLED display, boasting a 165Hz refresh rate and 2500 nits peak brightness, protected by Gorilla Glass Victus 2. Powered by Qualcomm Snapdragon 8 Gen 3, it ensures smooth performance. Capture stunning shots with a 50MP primary sensor, 13MP ultra-wide, and 32MP telephoto lenses. Enjoy extended usage with a 5,500mAh battery and fast charging support. Running Android 14 with ROG UI, it offers a seamless and customized user experience.",
      image: "QuickCartExpress/uvjdlvawwnnmge9lcwx9",
    },
    {
      id: 11,
      product_category_id: 53,
      product_brand_id: 23,
      unit_price: 69999.0,
      stock_quantity: 24,
      name: "Xiaomi 14",
      description:
        "Experience photography like never before with Xiaomi 14's 50MP Leica optics, Light Fusion 900 sensor, and Telephoto-Macro lens for versatile shots. Record cinematic videos in 8K and Dolby Vision. Enjoy vibrant visuals on the 6.36-inch 1.5K 120Hz LTPO AMOLED display, protected by Gorilla Glass Victus. Powered by Snapdragon 8 Gen 3, with HyperOS for smooth performance. Stay cool with Xiaomi IceLoop cooling. Fast charging up to 90W wired and 50W wireless ensures uninterrupted usage.",
      image: "QuickCartExpress/z5vgjr13qlygkedyt8n3",
    },
    {
      id: 12,
      product_category_id: 53,
      product_brand_id: 21,
      unit_price: 15499.0,
      stock_quantity: 105,
      name: "Huawei Mate 50 Pro",
      description:
        "The Huawei Mate 50 Pro features a stunning 6.74-inch OLED display. Its triple rear cameras, comprising 50MP + 13MP + 64MP, ensure exceptional photo quality. With a 13MP front camera, crisp selfies are guaranteed. Powered by Qualcomm Snapdragon 8 Plus Gen 1 chipset, Octa-core CPU, Adreno 730 GPU, and 8GB RAM, it delivers high-quality visuals and swift performance.",
      image: "QuickCartExpress/vs67u7it9tj908qwuzqo",
    },
    {
      id: 13,
      product_category_id: 53,
      product_brand_id: 15,
      unit_price: 54899.0,
      stock_quantity: 15,
      name: "Apple iPhone 12",
      description:
        "Introducing the iPhone 12, featuring a 6.1-inch Super Retina XDR display for vibrant visuals. With Ceramic Shield, it's tougher than any smartphone glass. Powered by the A14 Bionic chip, it offers unprecedented speed. Capture stunning photos with the advanced dual-camera system and record in 4K Dolby Vision HDR. Enjoy industry-leading IP68 water resistance and MagSafe compatibility for convenient wireless charging. Experience iOS with redesigned widgets, App Library, and more.",
      image: "QuickCartExpress/axefunr3fpjnmxw2oupd",
    },
    {
      id: 14,
      product_category_id: 52,
      product_brand_id: 16,
      unit_price: 89999.0,
      stock_quantity: 22,
      name: "Samsung Galaxy Tab S8 Ultra",
      description:
        "Experience unparalleled visual immersion with a 37.08 cm (14.6 inch) Cinematic Display boasting sAMOLED technology and a 120Hz refresh rate. Powered by Android 12 and a Snapdragon 8th Gen Chipset, enjoy seamless performance and Dolby Atmos quad speakers for immersive audio. Capture stunning moments with a 13/6MP dual rear camera and a 12MP front camera. With a massive 11200 mAh battery, enjoy up to 14 hours of video playback and super-fast charging up to 45W. With 12GB RAM and 256GB ROM, expanda",
      image: "QuickCartExpress/q3ga3en4xx4bn7fnzv6j",
    },
    {
      id: 15,
      product_category_id: 52,
      product_brand_id: 15,
      unit_price: 89900.0,
      stock_quantity: 19,
      name: "Apple iPad Pro",
      description:
        "Discover the unparalleled power of iPad Pro, featuring a 12.9-inch Liquid Retina XDR display for stunning visuals. Equipped with the Apple M1 chip, it delivers lightning-fast performance and efficiency. Capture high-resolution photos and 4K videos with the 12MP front and 12MP rear cameras. Enjoy up to 10 hours of battery life and seamless connectivity with Wi-Fi 6 and optional 5G. Compatible with the Apple Pencil and Magic Keyboard for ultimate creativity and productivity.",
      image: "QuickCartExpress/xkzmxvrmpitjixrxb23i",
    },
    {
      id: 16,
      product_category_id: 52,
      product_brand_id: 21,
      unit_price: 12999.0,
      stock_quantity: 66,
      name: "Huawei MatePad 11",
      description:
        "The Huawei MatePad 11 delivers smooth performance with the Qualcomm Snapdragon 865 processor and 6GB RAM. Its 11-inch IPS LCD screen with 120Hz refresh rate ensures clear and responsive visuals. The device offers a quad-speaker system for immersive sound and a 7250mAh battery for extended usage. EMUI 11 operating system ensures seamless multitasking, and optional M-Pencil support enhances productivity and creativity.",
      image: "QuickCartExpress/whs8lv5gbhzwznc39vyf",
    },
    {
      id: 17,
      product_category_id: 52,
      product_brand_id: 20,
      unit_price: 5999.0,
      stock_quantity: 58,
      name: "Dell Inspiron Tablet",
      description:
        "The Dell Inspiron Tablet offers a 10.1-inch FHD display with vibrant colors and sharp visuals. With Intel Atom processor, 4GB RAM, and 64GB storage, it handles multitasking with ease. Windows 10 OS provides familiar functionality and security. Enjoy up to 10 hours of battery life for all-day productivity. Its sleek and lightweight design makes it perfect for on-the-go usage.",
      image: "QuickCartExpress/nbngf1uwesg6vbbokc0k",
    },
    {
      id: 18,
      product_category_id: 51,
      product_brand_id: 19,
      unit_price: 2999.0,
      stock_quantity: 72,
      name: "HP Pavilion Laptop Bag",
      description:
        "Protect your laptop and essentials with this HP Pavilion laptop bag. Features multiple compartments, padded interior, and water-resistant material for safe transport. Adjustable shoulder strap ensures comfort, while a sleek design complements your professional style. Compatible with laptops up to 15.6 inches.",
      image: "QuickCartExpress/q6p4dxkfbihvhxntx7rx",
    },
    {
      id: 19,
      product_category_id: 51,
      product_brand_id: 20,
      unit_price: 3999.0,
      stock_quantity: 39,
      name: "Dell Urban Backpack",
      description:
        "The Dell Urban Backpack combines style and functionality. Spacious main compartment fits laptops up to 15.6 inches, while additional pockets store accessories and personal items. Padded straps and back panel enhance comfort, and durable materials ensure long-lasting use. Ideal for daily commutes and travel.",
      image: "QuickCartExpress/wa1q7klzmbuwrhgmc4qv",
    },
    {
      id: 20,
      product_category_id: 51,
      product_brand_id: 21,
      unit_price: 2799.0,
      stock_quantity: 88,
      name: "Huawei Slim Laptop Sleeve",
      description:
        "The Huawei Slim Laptop Sleeve protects devices with a sleek, minimalist design. Soft inner lining prevents scratches, and water-resistant exterior safeguards against spills. Fits laptops up to 14 inches, and lightweight construction makes it easy to carry in any bag or by hand.",
      image: "QuickCartExpress/yp8uhug7nac0sctqhdud",
    },
    {
      id: 21,
      product_category_id: 50,
      product_brand_id: 15,
      unit_price: 14999.0,
      stock_quantity: 33,
      name: "Apple Watch Series 9",
      description:
        "Apple Watch Series 9 offers advanced health and fitness tracking, seamless connectivity, and a brighter display. Measure heart rate, blood oxygen, and ECG, while tracking workouts and sleep patterns. Swimproof design, GPS, and Cellular capabilities enhance functionality. Run on watchOS 10 for new apps, complications, and widgets. Charge quickly with improved battery life.",
      image: "QuickCartExpress/qklgjpz5pslkw3rslfag",
    },
    {
      id: 22,
      product_category_id: 50,
      product_brand_id: 16,
      unit_price: 13499.0,
      stock_quantity: 44,
      name: "Samsung Galaxy Watch 6",
      description:
        "Samsung Galaxy Watch 6 features a Super AMOLED display, advanced health sensors, and customizable watch faces. Track heart rate, blood pressure, and sleep quality. Compatible with Android and iOS. Enjoy long-lasting battery life, water resistance, and fitness tracking for running, cycling, swimming, and more.",
      image: "QuickCartExpress/sic0ugf0ukm7a5uq3cpo",
    },
    {
      id: 23,
      product_category_id: 50,
      product_brand_id: 21,
      unit_price: 12999.0,
      stock_quantity: 52,
      name: "Huawei Watch GT 3",
      description:
        "Huawei Watch GT 3 comes with a classic design and long battery life. Monitor heart rate, sleep, SpO2, and stress levels. Receive notifications, control music, and track workouts with precision. Compatible with Android and iOS. Enjoy 14 days battery life and wireless charging.",
      image: "QuickCartExpress/ud4xwrp3nqobm8u9t4ct",
    },
    {
      id: 24,
      product_category_id: 50,
      product_brand_id: 23,
      unit_price: 12499.0,
      stock_quantity: 37,
      name: "Xiaomi Watch S1",
      description:
        "Xiaomi Watch S1 features a sleek AMOLED display, customizable watch faces, and multiple sports modes. Monitor heart rate, sleep, stress, and blood oxygen. Receive calls and notifications, control music, and enjoy up to 12 days of battery life. Compatible with Android and iOS.",
      image: "QuickCartExpress/qp6f2yfltytvuz5w0hb6",
    },
    {
      id: 25,
      product_category_id: 49,
      product_brand_id: 15,
      unit_price: 69900.0,
      stock_quantity: 7,
      name: "MacBook Air M2",
      description:
        "MacBook Air with M2 chip features a stunning 13.6-inch Liquid Retina display, up to 18 hours battery life, and fanless design for silent operation. Lightweight and powerful, it handles everyday tasks and creative workflows with ease. Touch ID ensures secure login and Apple ecosystem integration.",
      image: "QuickCartExpress/j7nlkjtqegcmv8tbr9ih",
    },
    {
      id: 26,
      product_category_id: 49,
      product_brand_id: 15,
      unit_price: 129900.0,
      stock_quantity: 5,
      name: "MacBook Pro 16-inch",
      description:
        "MacBook Pro 16-inch with M2 Max chip delivers unparalleled performance for professionals. Enjoy a Liquid Retina XDR display, up to 22 hours battery life, advanced cooling system, and expansive storage options. Ideal for video editing, software development, and demanding creative tasks. Comes with macOS Ventura for powerful workflows.",
      image: "QuickCartExpress/gsxgnxkjj8g5p2stzrol",
    },
    {
      id: 27,
      product_category_id: 49,
      product_brand_id: 20,
      unit_price: 49999.0,
      stock_quantity: 12,
      name: "Dell XPS 13",
      description:
        "Dell XPS 13 combines elegant design, a 13.4-inch InfinityEdge display, and powerful Intel processors for outstanding performance. With up to 32GB RAM and fast SSD storage, multitasking and creative work are seamless. Long battery life and lightweight construction make it portable for professionals and students.",
      image: "QuickCartExpress/p1nv1mlgypg7fgxk7wq3",
    },
    {
      id: 28,
      product_category_id: 49,
      product_brand_id: 20,
      unit_price: 85999.0,
      stock_quantity: 9,
      name: "Dell Inspiron 16",
      description:
        "Dell Inspiron 16 offers a 16-inch display, Intel Core i7 processor, up to 16GB RAM, and SSD storage for smooth multitasking. Backlit keyboard, Wi-Fi 6, and premium build ensure productivity and comfort. Suitable for students, office work, and light gaming.",
      image: "QuickCartExpress/hznhx2klvywfswnxylxr",
    },
    {
      id: 29,
      product_category_id: 49,
      product_brand_id: 21,
      unit_price: 36999.0,
      stock_quantity: 18,
      name: "Huawei MateBook D 14",
      description:
        "Huawei MateBook D 14 features a 14-inch FullView display, AMD Ryzen processor, and 8GB RAM for efficient multitasking. Lightweight and portable, it is ideal for students and professionals. Supports fast charging and features a fingerprint power button for security.",
      image: "QuickCartExpress/vo3nqkt7bk4mrw9nzqeh",
    },
    {
      id: 30,
      product_category_id: 49,
      product_brand_id: 21,
      unit_price: 47999.0,
      stock_quantity: 10,
      name: "Huawei MateBook X Pro",
      description:
        "Huawei MateBook X Pro features a 13.9-inch 3K LTPS touchscreen, Intel Core i7 processor, and 16GB RAM. Ultra-thin and lightweight, it is designed for professionals who need portability and power. Long battery life and fast charging support make it highly convenient.",
      image: "QuickCartExpress/qhigzbl1wv9syg95a9yl",
    },
    {
      id: 31,
      product_category_id: 49,
      product_brand_id: 23,
      unit_price: 34999.0,
      stock_quantity: 13,
      name: "Xiaomi Book Pro 14",
      description:
        "Xiaomi Book Pro 14 comes with 14-inch AMOLED display, Intel Core i5/i7 processors, 16GB RAM, and SSD storage. Sleek and lightweight design makes it ideal for students and professionals. Fast charging, fingerprint security, and Windows 11 OS included.",
      image: "QuickCartExpress/h6n9rx0cneuhp39zmhb3",
    },
    {
      id: 32,
      product_category_id: 49,
      product_brand_id: 23,
      unit_price: 42999.0,
      stock_quantity: 8,
      name: "Xiaomi Book Pro 16",
      description:
        "Xiaomi Book Pro 16 offers a 16-inch AMOLED display, Intel Core i7 processor, 16GB RAM, and SSD storage. Lightweight, powerful, and ideal for creative work and productivity. Fast charging and Windows 11 OS included.",
      image: "QuickCartExpress/etkvttvyf0omfyyi0k7c",
    },
  ]);

  // Shopping Carts
  await knex("shopping_cart").insert([
    { id: 1, user_id: 1 },
    { id: 10, user_id: 55 },
  ]);

  // Shopping Cart Items
  await knex("shopping_cart_item").insert([
    { id: 26, shopping_cart_id: 10, product_id: 2, quantity: 1 },
  ]);
}
