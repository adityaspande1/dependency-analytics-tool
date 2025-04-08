#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const _1 = require(".");
async function main() {
    // Parse command line arguments
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .usage('Usage: $0 [options]')
        .option('input', {
        alias: 'i',
        describe: 'Path to React project source directory',
        type: 'string',
        demandOption: true
    })
        .option('output', {
        alias: 'o',
        describe: 'Output JSON file path',
        type: 'string',
        default: './react-project-analysis.json'
    })
        .option('verbose', {
        alias: 'v',
        describe: 'Enable verbose logging',
        type: 'boolean',
        default: false
    })
        .help()
        .alias('help', 'h')
        .epilog('For more information visit https://github.com/yourusername/react-project-analyzer')
        .argv;
    const inputPath = path.resolve(argv.input);
    const outputPath = path.resolve(argv.output);
    // Validate input path
    if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input directory does not exist: ${inputPath}`);
        process.exit(1);
    }
    if (!fs.statSync(inputPath).isDirectory()) {
        console.error(`Error: Input path is not a directory: ${inputPath}`);
        process.exit(1);
    }
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    // Setup logging
    const log = argv.verbose
        ? (...args) => console.log(...args)
        : () => { };
    try {
        log(`Starting analysis of React project at ${inputPath}`);
        log(`Output will be written to ${outputPath}`);
        // Create analyzer instance
        const analyzer = new _1.ReactComponentAnalyzer(inputPath);
        // Start analysis
        log('Analyzing React components...');
        const startTime = Date.now();
        await analyzer.analyze();
        // Generate output file
        analyzer.generateOutput(outputPath);
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Analysis complete in ${duration}s`);
        console.log(`📊 Component tree generated at: ${outputPath}`);
    }
    catch (error) {
        console.error('❌ Error analyzing React project:');
        console.error(error);
        process.exit(1);
    }
}
// Execute main function
main().catch(error => {
    console.error('Unhandled error:');
    console.error(error);
    process.exit(1);
});
