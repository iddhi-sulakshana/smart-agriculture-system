# Contributing to Smart Agriculture System

Thank you for your interest in contributing to the **Smart Agriculture System** project for **Hacktoberfest 2025**! 🌾

This document provides guidelines and information for contributors who want to help improve this revolutionary agricultural platform.

## 🎯 Hacktoberfest 2025

This project is participating in **Hacktoberfest 2025**! Your contributions can help you earn the official Hacktoberfest 2025 digital badge and swag while supporting agricultural innovation.

### Hacktoberfest Guidelines

-   **Quality over Quantity**: We value meaningful contributions over spam
-   **Follow the Rules**: Ensure your PRs follow our contribution guidelines
-   **Be Patient**: Maintainers will review PRs as quickly as possible
-   **Respect the Process**: Follow the PR template and labeling system

## 🚀 Getting Started

### Prerequisites

-   [Git](https://git-scm.com/)
-   [Node.js 18+](https://nodejs.org/) (for frontend and backend)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community)
-   [Python 3.9+](https://www.python.org/downloads/) (for ML models)
-   [Docker](https://www.docker.com/get-started) (optional, for containerized setup)
-   [Visual Studio Code](https://code.visualstudio.com/) or your preferred editor

### Development Setup

1. **Fork the repository**

    ```bash
    # Click the "Fork" button on GitHub, then clone your fork
    git clone https://github.com/YOUR_USERNAME/smart-agriculture-system.git
    cd smart-agriculture-system
    ```

2. **Add upstream remote**

    ```bash
    git remote add upstream https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    ```

3. **Create a feature branch**

    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    # or
    git checkout -b docs/your-documentation-update
    ```

4. **Set up the development environment**

    ```bash
    # Install root dependencies
    npm install

    # Backend setup
    cd backend
    npm install
    npm run db:up  # Run database migrations

    # Frontend setup
    cd ../frontend
    npm install

    # ML Models setup
    cd ../models/CropRecommendation
    pip install -r requirements.txt

    cd ../PricePrediction
    pip install -r requirements.txt
    ```

## 📋 How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports

-   Use the **Bug Report** issue template
-   Provide detailed reproduction steps
-   Include screenshots if applicable
-   Test on the latest version
-   Specify which component (Frontend/Backend/ML Models)

#### ✨ Feature Requests

-   Use the **Feature Request** issue template
-   Describe the problem and proposed solution
-   Consider the impact on existing functionality
-   Check if similar features already exist
-   Consider agricultural use cases

#### 📚 Documentation

-   Improve existing documentation
-   Add code comments and examples
-   Create tutorials or guides
-   Fix typos and grammar
-   Add agricultural context and explanations

#### 🧪 Testing

-   Add unit tests for new features
-   Improve test coverage
-   Add integration tests
-   Performance testing
-   ML model validation tests

#### 🎨 UI/UX Improvements

-   Design improvements
-   Accessibility enhancements
-   Mobile responsiveness
-   User experience optimizations
-   Agricultural data visualization

#### 🤖 Machine Learning

-   Improve prediction accuracy
-   Add new ML models
-   Optimize existing algorithms
-   Add data preprocessing features
-   Create model evaluation metrics

### Contribution Process

1. **Find an Issue**

    - Look for issues labeled `good first issue` or `help wanted`
    - Check the Hacktoberfest 2025 issues
    - Comment on the issue to express interest

2. **Create Your Branch**

    ```bash
    git checkout -b feature/issue-number-description
    ```

3. **Make Your Changes**

    - Follow the coding standards
    - Write clear commit messages
    - Add tests if applicable
    - Update documentation

4. **Test Your Changes**

    ```bash
    # Backend tests
    cd backend && npm test

    # Frontend tests
    cd frontend && npm test

    # ML model tests
    cd models/CropRecommendation && python -m pytest tests/
    ```

5. **Commit Your Changes**

    ```bash
    git add .
    git commit -m "feat: add crop recommendation for rice farming"
    ```

6. **Push and Create PR**
    ```bash
    git push origin feature/issue-number-description
    # Then create a Pull Request on GitHub
    ```

## 📝 Coding Standards

### General Guidelines

-   **Write clean, readable code**
-   **Follow existing code patterns**
-   **Add comments for complex logic**
-   **Use meaningful variable and function names**
-   **Keep functions small and focused**
-   **Consider agricultural context in naming**

### Backend (Node.js + Express)

-   Follow [JavaScript Standard Style](https://standardjs.com/)
-   Use ES6+ features
-   Implement proper error handling
-   Add JSDoc comments for public APIs
-   Follow async/await patterns
-   Use environment variables for configuration

### Frontend (React + Vite)

-   Follow [React Best Practices](https://react.dev/learn)
-   Use functional components with hooks
-   Follow [Material-UI](https://mui.com/) conventions
-   Implement responsive design
-   Use proper state management
-   Add PropTypes or TypeScript for type safety

### Machine Learning (Python)

-   Follow [PEP 8](https://pep8.org/) style guide
-   Add docstrings for functions and classes
-   Use type hints where possible
-   Implement proper error handling
-   Add logging for model training
-   Follow ML best practices for data handling

### Git Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

feat(ml): add rice crop recommendation model
fix(frontend): resolve crop image upload issue
docs(api): update crop prediction endpoint documentation
test(backend): add unit tests for user authentication
refactor(ml): optimize price prediction algorithm
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Scopes**: `frontend`, `backend`, `ml`, `api`, `auth`, `marketplace`, `chat`

## 🏷️ Issue and PR Labels

### Issue Labels

-   `hacktoberfest` - Eligible for Hacktoberfest 2025
-   `good first issue` - Perfect for newcomers
-   `help wanted` - Community help needed
-   `bug` - Something isn't working
-   `enhancement` - New feature or request
-   `documentation` - Documentation improvements
-   `backend` - Backend (Node.js) related
-   `frontend` - Frontend (React) related
-   `ml` - Machine Learning related
-   `database` - MongoDB related
-   `ui/ux` - User interface improvements
-   `performance` - Performance optimizations
-   `security` - Security improvements

### PR Labels

-   `hacktoberfest-accepted` - Accepted for Hacktoberfest 2025
-   `ready-for-review` - Ready for maintainer review
-   `needs-changes` - Requires changes before merge
-   `breaking-change` - Contains breaking changes
-   `frontend` - Frontend changes
-   `backend` - Backend changes
-   `ml` - Machine learning changes
-   `documentation` - Documentation changes

## 🧪 Testing Guidelines

### Backend Testing

```bash
cd backend

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run with coverage
npm run test:coverage
```

### Frontend Testing

```bash
cd frontend

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### ML Model Testing

```bash
# Crop Recommendation Model
cd models/CropRecommendation
python -m pytest tests/

# Price Prediction Model
cd ../PricePrediction
python -m pytest tests/

# Run model validation
python validate_model.py
```

### Integration Testing

```bash
# Run full integration tests
npm run test:integration

# Test API endpoints
npm run test:api

# Test ML model integration
npm run test:ml-integration
```

## 📖 Documentation

### Code Documentation

-   Add JSDoc comments for JavaScript functions
-   Add docstrings for Python functions
-   Include examples in documentation
-   Update README.md for major changes
-   Document configuration options

### API Documentation

-   Update API documentation for new endpoints
-   Include request/response examples
-   Document error codes and messages
-   Add authentication requirements
-   Document rate limiting

### Agricultural Documentation

-   Document crop types and requirements
-   Explain prediction models and algorithms
-   Add farming best practices
-   Document market analysis features
-   Include user guides for farmers

## 🔍 Review Process

### Pull Request Review

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Maintainers review code quality and functionality
3. **Testing**: Verify changes work as expected
4. **Documentation**: Ensure documentation is updated
5. **Agricultural Context**: Verify changes align with farming needs
6. **Approval**: Maintainer approves and merges

### Review Criteria

-   **Functionality**: Does it work as intended?
-   **Code Quality**: Is the code clean and maintainable?
-   **Testing**: Are there adequate tests?
-   **Documentation**: Is documentation updated?
-   **Performance**: Does it impact performance?
-   **Security**: Are there security implications?
-   **Agricultural Relevance**: Does it benefit farmers?

## 🚫 What Not to Contribute

### Spam Contributions

-   Automated or scripted contributions
-   Duplicate content
-   Irrelevant changes
-   Whitespace-only changes
-   Translation changes without context

### Inappropriate Content

-   Offensive or inappropriate language
-   Copyrighted material without permission
-   Personal information or credentials
-   Malicious code or security vulnerabilities

### Agricultural Misinformation

-   Incorrect farming advice
-   Unverified crop recommendations
-   Misleading price predictions
-   Unsafe agricultural practices

## 🆘 Getting Help

### Resources

-   **Documentation**: Check the [Wiki](https://github.com/iddhi-sulakshana/smart-agriculture-system)
-   **Issues**: Search existing issues or create new ones
-   **Discussions**: Use GitHub Discussions for questions
-   **API Docs**: Check backend API documentation

### Contact

-   **Email**: iddhidasanayaka@gmail.com
-   **GitHub**: [@iddhi-sulakshana](https://github.com/iddhi-sulakshana)
-   **Website**: [Smart Agriculture System](https://smart-agriculture-system-eight.vercel.app)

### Agricultural Support

-   **Farming Questions**: Use GitHub Discussions
-   **Crop Advice**: Check existing documentation
-   **Market Information**: Refer to prediction models
-   **Technical Issues**: Create GitHub issues

## 🎉 Recognition

### Contributors

-   All contributors will be listed in the README
-   Significant contributors may be added as maintainers
-   Hacktoberfest 2025 participants will be recognized
-   Agricultural experts will be specially acknowledged

### Hacktoberfest 2025

-   Valid PRs will be marked with `hacktoberfest-accepted`
-   Contributors will earn the official Hacktoberfest 2025 badge
-   Special recognition for agricultural innovation contributions

### Agricultural Impact

-   Contributors helping farmers will be highlighted
-   Agricultural improvements will be featured
-   Real-world impact stories will be shared
-   Community recognition for farming community support

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## 🌾 Agricultural Considerations

### Farming Context

-   Consider the needs of small-scale farmers
-   Think about mobile accessibility in rural areas
-   Ensure solutions work in various climates
-   Consider local agricultural practices

### Data Privacy

-   Protect farmer information
-   Secure agricultural data
-   Respect local privacy laws
-   Consider data sovereignty

### Impact Focus

-   Prioritize features that help farmers
-   Focus on practical solutions
-   Consider sustainability aspects
-   Think about long-term agricultural benefits

---

## 🎯 Quick Checklist for Contributors

-   [ ] I have read and understood the Code of Conduct
-   [ ] I have checked for existing issues and PRs
-   [ ] I have created a feature branch for my changes
-   [ ] I have followed the coding standards
-   [ ] I have added tests for my changes
-   [ ] I have updated documentation as needed
-   [ ] I have tested my changes locally
-   [ ] I have considered agricultural impact
-   [ ] I have created a clear and descriptive PR
-   [ ] I have linked my PR to the related issue

**Thank you for contributing to the Smart Agriculture System project! Together, we're revolutionizing farming for Hacktoberfest 2025! 🌾🚀**

---

_This contributing guide is updated for Hacktoberfest 2025. Last updated: December 2024_

_For questions about contributing, contact: iddhidasanayaka@gmail.com_
