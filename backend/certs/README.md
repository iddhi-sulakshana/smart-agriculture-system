# Using OPENSSL

# Easy one step:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privatekey.key -out certificate.crt
```

Generate the Certificate Using OpenSSL:Use OpenSSL to generate the certificate with the configuration file:
bash

## Create a Configuration File named `openssl.cnf`

```ini
[req]
default_bits       = 2048
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca

[req_distinguished_name]
countryName                = Country Name (2 letter code)
countryName_default        = US
stateOrProvinceName        = State or Province Name (full name)
localityName               = Locality Name (e.g., city)
organizationName           = Organization Name (e.g., company)
organizationalUnitName     = Organizational Unit Name (e.g., section)
commonName                 = Common Name (e.g., fully qualified domain name)

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names

[alt_names]
IP.1 = 192.168.1.78

```

## Generate a new private key

```bash
openssl genrsa -out privatekey.key 2048
```

## Create the certificate signing request (CSR)

```bash
openssl req -new -key privatekey.key -out server.csr -config openssl.cnf
```

## Generate a self-signed certificate with the CSR and config file

```bash
openssl x509 -req -days 365 -in server.csr -signkey privatekey.key -out certificate.crt -extensions v3_ca -extfile openssl.cnf
```

# Using mkcert

## Install mkcert:

### Windows: Use Chocolatey or Scoop package managers.

```bash
choco install mkcert
```

or

```bash
scoop install mkcert
```

### macOS: Install via Homebrew.

```bash
brew install mkcert
```

### Linux: Download the binary from the releases page and install certutil:

```bash
sudo apt install libnss3-tools
sudo cp mkcert-vX.X.X-linux-amd64 /usr/local/bin/mkcert
chmod +x /usr/local/bin/mkcert
```

## Set Up the Local CA:Run the following command to set up a local certificate authority that browser will trust.

```bash
mkcert -install
```

## Generate a Self-Signed Certificate for IP Address: (e.g., 192.168.1.78).

```bash
mkcert 192.168.1.78
```

This will create two files:
192.168.1.78.pem (Certificate)
192.168.1.78-key.pem (Private Key)
Update Application to Use the New Certificates:In server code, replace the paths to the certificate and key files with the newly generated .pem files.

```javascript
const options = {
    key: fs.readFileSync("192.168.1.78-key.pem"),
    cert: fs.readFileSync("192.168.1.78.pem"),
};

const server = https.createServer(options, app);
```

Restart Server:Restart your backend server to apply the new certificates.
