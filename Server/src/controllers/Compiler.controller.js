const axios = require('axios').default;

module.exports = {
  async playground(req, res) {
    const { code, language_id, input } = req.body;
    const playload = [];
    try {
      const options = {
        method: 'POST',
        url: `${process.env.JUDGE0_HOST}/submissions`,
        params: { base64_encoded: 'true', wait: 'true', fields: '*' },
        headers: { 'content-type': 'application/json' },
        data: {
          language_id,
          source_code: Buffer.from(code).toString('base64'),
          stdin: Buffer.from(input).toString('base64'),
          expected_output: Buffer.from(input).toString('base64'),
        },
      };
      const responses = await axios.request(options);
      const stdoutb64string = responses.data.stdout;
      const stderrb64string = responses.data.stderr;
      const compile_outputb64string = responses.data.compile_output;
      const stdOut = new Buffer.from(
        stdoutb64string === null ? '' : stdoutb64string,
        'base64',
      ).toString('utf-8');
      const stdErr = new Buffer.from(
        stderrb64string === null ? '' : stderrb64string,
        'base64',
      ).toString('utf-8');
      const comErr = new Buffer.from(
        compile_outputb64string === null ? '' : compile_outputb64string,
        'base64',
      ).toString('utf-8');
      let output;
      if (stdOut !== null) output = stdOut;
      else if (stdOut === null && stdErr !== null) output = stdErr;
      else if (stdOut === null && stdErr === null && comErr !== null) output = stdErr;
      res.json({
        stdout: output,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async playground2(req, res) {
    const { code, language_id, input } = req.body;
    const playload = [];
    try {
      const options = {
        method: 'POST',
        url: `${process.env.JUDGE0_HOST}/submissions`,
        params: { base64_encoded: 'true', wait: 'true', fields: '*' },
        headers: { 'content-type': 'application/json' },
        data: {
          language_id,
          source_code: Buffer.from(code).toString('base64'),
          stdin: Buffer.from(input).toString('base64'),
          expected_output: Buffer.from(input).toString('base64'),
        },
      };
      const responses = await axios.request(options);
      const stdoutb64string = responses.data.stdout;
      const stderrb64string = responses.data.stderr;
      const compile_outputb64string = responses.data.compile_output;
      const stdOut = new Buffer.from(
        stdoutb64string === null ? '' : stdoutb64string,
        'base64',
      ).toString('utf-8');
      const stdErr = new Buffer.from(
        stderrb64string === null ? '' : stderrb64string,
        'base64',
      ).toString('utf-8');
      const comErr = new Buffer.from(
        compile_outputb64string === null ? '' : compile_outputb64string,
        'base64',
      ).toString('utf-8');
      res.json({
        stdout: stdOut,
        stderr: stdErr,
        compile_output: comErr,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
