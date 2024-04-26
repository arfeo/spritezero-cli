const test = require('tap').test;
const fs = require('fs');
const spawn = require('child_process').spawn;
const deepEqual = require("deep-equal");

test('needs 2 arguments', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero']);

  spritezero.on('close', (code) => {
    t.ok(code > 0, 'closes early');
    t.end();
  });
});

test('provides help', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero', '--help']);

  spritezero.on('close', (code) => {
    t.ok(code > 0, 'closes early');
    t.end();
  });
});

test('generate 1x sprites', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero', 'test/output/maki', 'test/fixture/input']);

  spritezero.stderr.on('data', (err) => {
    t.fail(err.toString());
  });

  spritezero.on('close', (code) => {
    t.equal(code, 0);

    deepEqual(
      JSON.parse(fs.readFileSync('test/output/maki.json')),
      JSON.parse(fs.readFileSync('test/fixture/output/maki.json')),
      'layout',
    );

    t.end();
  });
});

test('generate 2x sprites', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero', 'test/output/maki-r-2', 'test/fixture/input', '--ratio', 2]);

  spritezero.on('close', (code) => {
    t.equal(code, 0);

    deepEqual(
      JSON.parse(fs.readFileSync('test/output/maki-r-2.json')),
      JSON.parse(fs.readFileSync('test/fixture/output/maki-r-2.json')),
      'layout',
    );

    t.end();
  });
});

test('generate --retina sprites', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero', 'test/output/maki-retina', 'test/fixture/input', '--retina']);

  spritezero.on('close', (code) => {
    t.equal(code, 0);

    deepEqual(
      JSON.parse(fs.readFileSync('test/output/maki-retina.json')),
      JSON.parse(fs.readFileSync('test/fixture/output/maki-r-2.json')),
      'layout',
    );

    t.end();
  });
});

test('generate --unique sprites', (t) => {
  const spritezero = spawn('node', ['./bin/spritezero', 'test/output/maki-unique', 'test/fixture/input', '--unique']);

  spritezero.on('close', (code) => {
    t.equal(code, 0);

    deepEqual(
      JSON.parse(fs.readFileSync('test/output/maki-unique.json')),
      JSON.parse(fs.readFileSync('test/fixture/output/maki-unique.json')),
      'layout',
    );

    t.end();
  });
});
