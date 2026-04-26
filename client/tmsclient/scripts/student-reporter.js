import fs from 'fs';
import path from 'path';

/**
 * A custom Playwright reporter that generates a simple, "student-made" HTML report.
 */
class StudentReporter {
  onBegin(config, suite) {
    this.results = [];
    this.startTime = Date.now();
  }

  onTestEnd(test, result) {
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message
    });
  }

  async onEnd(result) {
    const duration = Date.now() - this.startTime;
    const reportDir = path.join(process.cwd(), 'playwright-report');
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>E2E Testing Report - ASE Assignment</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 50px; 
            background-color: #f4f7f6; 
            color: #333;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 900px;
            margin: auto;
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        .meta-info {
            background: #eef2f3;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 25px;
            font-size: 0.95em;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
        }
        th { 
            background-color: #3498db; 
            color: white;
        }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .status-passed { 
            color: #27ae60; 
            font-weight: bold;
        }
        .status-failed { 
            color: #e74c3c; 
            font-weight: bold;
        }
        .error-msg {
            font-size: 0.85em;
            color: #c0392b;
            background: #fdf2f2;
            padding: 5px;
            display: block;
            margin-top: 5px;
            white-space: pre-wrap;
        }
        .footer { 
            margin-top: 40px; 
            font-size: 0.8em; 
            color: #7f8c8d;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>TMS Automation Test Results</h1>
        
        <div class="meta-info">
            <strong>Project:</strong> Tennis Management System (TMS) - Playwright E2E Suite<br>
            <strong>Generated On:</strong> ${new Date().toLocaleString()}<br>
            <strong>Total Execution Time:</strong> ${(duration / 1000).toFixed(2)} seconds<br>
            <strong>Final Result:</strong> <span class="status-${result.status}">${result.status.toUpperCase()}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Test Case Description</th>
                    <th>Result</th>
                    <th>Duration (ms)</th>
                </tr>
            </thead>
            <tbody>
                ${this.results.map((r, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <strong>${r.title}</strong>
                            ${r.error ? `<code class="error-msg">${r.error.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>` : ''}
                        </td>
                        <td class="status-${r.status}">${r.status.toUpperCase()}</td>
                        <td>${r.duration}ms</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="footer">
            End of Testing Report. This report was automatically generated for the ASE Assignment.
        </div>
    </div>
</body>
</html>
    `;

    fs.writeFileSync(path.join(reportDir, 'index.html'), html);
    
    // Also print a simple summary to the terminal
    console.log('\n' + '='.repeat(50));
    console.log('STUDENT TEST SUMMARY');
    console.log('='.repeat(50));
    this.results.forEach((r, i) => {
      const statusIcon = r.status === 'passed' ? '✓' : '✗';
      console.log(`${i + 1}. [${r.status.toUpperCase()}] ${statusIcon} ${r.title} (${r.duration}ms)`);
    });
    console.log('='.repeat(50));
    console.log(`TOTAL: ${this.results.length} tests | Result: ${result.status.toUpperCase()}`);
    console.log('='.repeat(50));
    console.log('HTML Report Generated at: playwright-report/index.html');
  }
}

export default StudentReporter;
