<img src="https://www.oamk.fi/images/Logot/Suomi-www-sahkoinen-png-rgb/www_sivut_ja_sahkoiset_esitykset_suomeksi_varillinen-02.png" align="center" />

# Puppeteer practice

## Overview
Welcome to the "Puppeteer Practice" repository! This project serves as a hands-on demonstration of web scraping using Puppeteer, a Node library that provides a high-level API to control headless browsers or full browsers over the DevTools Protocol. In this particular instance, the project showcases the use of Puppeteer with TypeScript to scrape your school restaurant menu **https://fi.jamix.cloud/**.

## Features
- **Puppeteer & TypeScript**: The project leverages Puppeteer, coupled with the power of TypeScript, to create a robust and type-safe web scraping solution.

- **Scraping School Restaurant Menu**: The primary focus of this practice is to scrape the menu of your school's restaurant. This involves navigating through web pages, interacting with elements, and extracting relevant information using Puppeteer's capabilities.

- **Target Site URL:** The data is scraped from the following URL: [School Restaurant Menu](https://fi.jamix.cloud/apps/menu/?anro=93077&k=48&mt=89)

- **Full Week's Menu in JSON Format**: Added functionality to retrieve the full week's menu and return it in JSON format. This enhancement provides a comprehensive overview of the restaurant offerings for the entire week.
```json
[
  {
    "date": "maanantai 15.1.2024",
    "menu": [
      {
        "title": "KASVIS OP",
        "content": ["Burgundinpata soijasuikaleista G, Mu, VEG, *, L, M"]
      },
      {
        "title": "LOUNAS I Mu",
        "content": [
          "Sitruunainen kalaleike Mu, *, M",
          "Lime-tilli-kermaviilikastike G, Mu, L"
        ]
      },
      {
        "title": "LOUNAS II",
        "content": ["Kebabkastike tulinen G, Mu, *, M"]
      },
      {
        "title": "LÄMPIMÄT LISUKKEET VEG",
        "content": [
          "Keitetyt perunat G, Mu, VEG, *, M",
          "Tumma pasta Mu, VEG, *, L, M",
          "Täysjyväriisi G, Mu, VEG, *, M",
          "Lämmin kasvislisäke G, VEG"
        ]
      }
    ]
  },
  {
    "date": "tiistai 16.1.2024",
    "menu": [
      {
        "title": "KASVIS OP",
        "content": ["Pähkinäinen tofu-pastapaistos Mu, VEG, *, M"]
      }
    ]
  }
  // ... Repeat for the rest of the week
]
```

## Getting Started

1. **Clone the Repository:** Begin by cloning this repository to your local machine.

    ```bash
    git clone https://github.com/Aik-10/puppeteer_test.git
    ```

2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies and build.

    ```bash
    cd puppeteer_test
    pnpm i && pnpm build
    ```

3. **Run the Script:** Execute the TypeScript script to initiate the Puppeteer scraping process.

    ```bash
    pnpm start
    ```

## Contribution
Feel free to explore, modify, and enhance the code as part of your learning journey. If you discover improvements or have insights to share, don't hesitate to contribute by creating a pull request.