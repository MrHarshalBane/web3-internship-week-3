# Module 04: Automated Testing, Smart Contract Security & Testnet Deployment

## Overview
Module 04 completes the Web3 development lifecycle. It contains automated integration test suites, a comprehensive smart contract security audit report, deployment scripts, and deployment documentation.

---

## Key Artifacts in Module 04

1. **`scripts/deploy.js`:** Node.js deployment script for deploying `SkillNFT` and `SkillVault` smart contracts.
2. **`tests/suite.test.js`:** Master integration test suite testing access control, reentrancy guards, metadata URIs, and inter-contract workflows.
3. **`security-audit.md`:** Detailed vulnerability assessment covering Reentrancy, Access Control, Integer Arithmetic, and Input Validation.
4. **`deployment.md`:** Step-by-step deployment guide and placeholder evidence log for testnet submission.
5. **`test-report.md`:** Summary of expected vs observed test results.

---

## How to Run Master Test Suite

Execute the master integration test suite:
```bash
node 04/tests/suite.test.js
```
