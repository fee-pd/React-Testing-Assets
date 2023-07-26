# Annotations

Playwright Test supports test annotations to deal with failures, flakiness, skip, focus and tag tests:

* ***test.skip()*** marks the test as irrelevant. Playwright Test does not run such a test. Use this annotation when the test is not applicable in some configuration.
* ***test.fail()*** marks the test as failing. Playwright Test will run this test and ensure it does indeed fail. If the test does not fail, Playwright Test will complain.
* ***test.fixme()*** marks the test as failing. Playwright Test will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.
* ***test.slow()*** marks the test as slow and triples the test timeout.
Annotations can be used on a single test or a group of tests. Annotations can be conditional, in which case they apply when the condition is truthy. Annotations may depend on test fixtures. There could be multiple annotations on the same test, possibly in different configurations.


```
tests/4-annotations.spec.ts
```

```
  npx playwright test 4-annotations.spec.ts
```
