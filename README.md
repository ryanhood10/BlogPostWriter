# BlogPostWriter

CoverLetterGenerator is a web application that helps users generate professional cover letters based on their input. The app is built using React for the frontend and Express for the backend.

## Features

- User-friendly interface to input job position, company name, skills, company values, and job listing.
- Generates a concise and professional cover letter using OpenAI's GPT-3.5 API.
- Option to copy the generated cover letter to the clipboard for easy use.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

    ```sh
    git clone git@github.com:ryanhood10/BlogPostWriter.git
    cd BlogPostWriter
    ```

2. **Install dependencies for the client and server:**

    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

### Running the Application

1. **Obtain an OpenAI API key:**

    Go to [OpenAI](https://platform.openai.com/signup) and sign up for an API key. Once you have your API key, create a `.env` file in the `server` directory and add your API key:

    ```sh
    OPENAI_API_KEY=your_openai_api_key
    ```

2. ** Change the handleGenerateCoverLetter function to call Local Host**
   In the MainPage.jsx, comment out line 44 and uncomment line 45; So that we are calling localhost instead of the deployed application.
    ```sh
       //  "https://cover-letter-generator-ai-b7323a56ca78.herokuapp.com/completions",  options );
       "http://localhost:3001/completions",  options );
    ```
   
2. **Start the frontend (React) server:**

    ```sh
    cd client
    npm start
    ```

3. **Start the backend (Express) server:**

    ```sh
    cd ../server
    npm start
    ```

### Usage

Once both servers are running, open your browser and navigate to `http://localhost:3000`. Follow these steps to generate a cover letter:

1. Fill in the prompts with your job position, company name, relevant skills, company values, and the job listing.
2. Click on the "Generate Cover Letter" button.
3. The generated cover letter will appear below the form. You can then copy it to the clipboard for use in your job application.

### Deployment

To deploy the application to Heroku, follow these steps:

1. **Create a Procfile** in the root of your project:

    ```
    web: cd server && npm install && npm run start
    ```

2. **Set up the Heroku remote:**

    ```sh
    heroku create your-app-name
    git push heroku main
    ```

3. **Configure environment variables:**

    Ensure that you set your OpenAI API key and any other necessary environment variables on Heroku.

    ```sh
    heroku config:set OPENAI_API_KEY=your_openai_api_key
    ```

4. **Deploy the application:**

    ```sh
    git push heroku main
    ```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [OpenAI GPT-3.5](https://openai.com/)
