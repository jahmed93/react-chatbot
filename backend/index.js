const express = require('express');
const { auth, resolver, protocol } = require('@iden3/js-iden3-auth');
const getRawBody = require('raw-body');
const path = require('path');
const uuidv4 = require('uuid').v4;

const app = express();
const port = 11000;

// Allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.get('/api/sign-in', (req, res) => {
  console.log('get Auth Request');
  GetAuthRequest(req, res);
});

app.post('/api/callback', (req, res) => {
  console.log('callback');
  Callback(req, res);
});

app.listen(port, () => {
  console.log('server running on port 8080');
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

// GetQR returns auth request
async function GetAuthRequest(req, res) {
  // Audience is verifier id
  const hostUrl = 'http://52.172.254.231:11000';
  const sessionId = uuidv4();
  const callbackURL = '/api/callback';
  const audience = 'did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs';

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequest('test flow', audience, uri);

  // request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
  // request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

  // Add request for a specific proof
  // eslint-disable-next-line
  const proofRequest = {
    id: 1,
    circuitId: 'credentialAtomicQuerySigV2',
    query: {
      allowedIssuers: ['*'],
      type: 'ageverifier',
      context: 'ipfs://QmTzSzLw2tLTJsKNyeFdMceD4KdtTSEwzUFbeiHMJsHukV',
      credentialSubject: {
        age: {
          $gt: 10,
        },
      },
    },
  };
  const scope = request.body.scope ?? [];
  request.body.scope = [...scope, proofRequest];

  // Store auth request in map associated with session ID
  requestMap.set(`${sessionId}`, request);

  return res.status(200).set('Content-Type', 'application/json').send(request);
}

// Callback verifies the proof after sign-in callbacks
async function Callback(req, res) {
  // Get session ID from request
  console.log(req);
  const sessionId = req.query.sessionId;
  console.log(sessionId);

  // get JWZ token params from the post request
  const raw = await getRawBody(req);
  const tokenStr = raw.toString().trim();

  const ethURL = 'https://polygon-mumbai.infura.io/v3/087274a375d54c7a9d316110ead80cc9';
  const contractAddress = '0x134B1BE34911E39A8397ec6289782989729807a4';
  const keyDIR = '../keys';

  const ethStateResolver = new resolver.EthStateResolver(ethURL, contractAddress);

  const resolvers = {
    ['polygon:mumbai']: ethStateResolver,
  };

  try {
    // fetch authRequest from sessionID
    const authRequest = requestMap.get(`${sessionId}`);

    // EXECUTE VERIFICATION
    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: path.join(__dirname, keyDIR),
      ipfsGatewayURL: 'https://ipfs.io',
    });
  } catch (e) {
    //
  }

  try {
    const opts = {
      AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
    };
    authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);
  } catch (error) {
    // return res.status(500).send(error);
  }

  // sessionID

  return res.status(200).set('Content-Type', 'application/json').send(' Succesfully authenticated');
}
