# AI Playground

## Project Overview
The AI Playground is a web application built using Next.js and TypeScript. It is designed to showcase AI model integration and allow users to interact with different AI functionalities. This project also uses TailwindCSS for styling and Redux for state management.

---

## App Structure
The application is structured as follows:

### **Root Directory**
- **`tsconfig.json`**: TypeScript configuration file.
- **`.env`**: Environment variables file.
- **`.gitignore`**: Specifies files to be ignored by Git.
- **`eslint.config.mjs`**: ESLint configuration file for linting.
- **`next.config.ts`**: Next.js configuration file.
- **`postcss.config.mjs`**: PostCSS configuration file for styling.
- **`tailwind.config.ts`**: TailwindCSS configuration file.
- **`package.json`**: Contains project dependencies and scripts.
- **`README.md`**: Project documentation (this file).

### **`/public` Directory**
Contains static assets such as images, logos, and icons.

### **`/src` Directory**
#### **`/app`**
- Contains application-specific pages.
  - **`layout.tsx`**: Defines the layout for the application.
  - **`page.tsx`**: Defines the homepage of the application.
  - **`ai-prompt/page.tsx`**: Handles the AI prompt page functionality.

#### **`/commonElements`**
Reusable UI components such as:
- **`Button`**
- **`Checkbox`**
- **`Image`**
- **`Input`**

#### **`/components`**
Contains functional components for the application, grouped by feature or page.
- **`Page/AiPromptPage`**: Components specific to the AI prompt page.
- **`Page/HomePage`**: Components specific to the homepage.
- **`TypeWriterAnimation`**: Handles typewriter-style animations.

#### **`/config`**
- **`aiModelData.tsx`**: Configuration file for managing available AI models.
- **`config.tsx`**: Contains global configurations.

#### **`/helper`**
- **`HfHelper.tsx`**: Helper functions for interacting with Hugging Face models.

#### **`/interface`**
- **`models.tsx`**: TypeScript interfaces for defining application data structures.

#### **`/layout`**
- Application layout components such as Header and Sidebar.

#### **`/redux`**
State management using Redux.
- **`store.tsx`**: Redux store configuration.
- **`reducers`**: Contains reducers for managing state (e.g., AI models, prompts, authentication).

#### **`/styles`**
Contains global and custom CSS files for styling.

---

## How to Run the Project

### **Prerequisites**
Ensure you have the following installed on your system:
- Node.js (version 16 or higher)
- npm or yarn package manager

### **Steps**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

4. Build the project for production:
   ```bash
   npm run build
   ```
   This will generate optimized static files in the `.next` directory.

5. Start the production server:
   ```bash
   npm run start
   ```

---

## How to Add a Model in `aiModelData.tsx`
To add a new AI model to the application:

1. Open the `aiModelData.tsx` file located in the `src/config` directory.
2. Add a new object to the `models` array with the following structure:
   ```typescript
   {
       id: 'unique_model_id(number)',
       name: 'Model Name',
       image: 'path to image',
       model: 'model name form hugging face',
   }
   ```
   Example:
   ```typescript
   {
        id: 1,
        name: 'QwenAi2_5',
        image: '/qwen-icon.png',
        model: "Qwen/Qwen2.5-72B-Instruct",
    }
   ```
3. Save the file and restart the development server to see the changes reflected in the application.
