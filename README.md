# Divi 5 Extension Example - Custom Modals

This plugin demonstrates how to create custom modals in Divi 5 Visual Builder using the Modal Library system.

## Features

- **Module Visibility Manager**: A custom modal that allows users to toggle the visibility of different Divi modules in the Add Module dialog
- **Real-time Updates**: Changes are applied immediately to the Visual Builder interface
- **WordPress Integration**: Settings are persisted using WordPress REST API
- **Educational Purpose**: Serves as a reference implementation for developers

## Installation

1. Download the plugin files
2. Upload to your WordPress plugins directory
3. Activate the plugin through the WordPress admin
4. Open Divi Visual Builder on any page
5. Look for the "Module Visibility" button in the builder toolbar

## Development

### Prerequisites

- Node.js (for build tools)
- WordPress development environment
- Divi theme installed and activated

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Build Commands

#### Create Distribution Package

To create a distribution-ready zip file of the plugin:

```bash
npm run zip
```

This command will:
- Create a `d5-extension-example-modals.zip` file
- Exclude development files (`node_modules/`, `src/`, `.git/`, etc.)
- Include only production-ready plugin files
- Ready for distribution or installation

#### File Exclusions

The zip command automatically excludes:
- Development dependencies (`node_modules/`)
- Source files (`src/`)
- Git files (`.git/`, `.gitignore`)
- Build configuration files (`gulpfile.js`, `package.json`, etc.)
- IDE and system files (`.vscode/`, `.DS_Store`, etc.)

## Usage

1. **Open Visual Builder**: Edit any page with Divi Visual Builder
2. **Find Module Visibility Button**: Look for the button in the builder toolbar
3. **Toggle Module Visibility**: Use the modal to show/hide different module types
4. **See Real-time Changes**: The Add Module dialog updates immediately
5. **Persistent Settings**: Your preferences are saved automatically

## Technical Details

### Architecture

- **PHP Backend**: WordPress plugin structure with REST API endpoints
- **React Frontend**: Custom modal components integrated with Divi 5
- **Redux Integration**: Uses Divi's settings store for state management
- **WordPress Filters**: Integrates with `divi.modalLibrary.addModule.moduleList` hook

### Key Files

- `d5-extension-example-modals.php`: Main plugin file
- `module-visibility-manager/`: React components and modal logic
- `package.json`: Build dependencies and scripts
- `gulpfile.js`: Build task configuration

## Educational Value

This plugin demonstrates:

1. **Custom Modal Creation**: How to create modals that integrate with Divi 5
2. **WordPress Integration**: Proper use of WordPress APIs for data persistence
3. **React Patterns**: Modern React development within Divi 5 ecosystem
4. **Build Tooling**: Professional development and distribution workflows

## Contributing

This is an educational example plugin. Feel free to use it as a reference for your own Divi 5 extensions.

## License

GPL-2.0-or-later