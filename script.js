
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #090b14;
  color: #ffffff;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: #111421;
  border-bottom: 1px solid #29213e;
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #792cff;
  font-size: 23px;
  font-weight: bold;
  box-shadow: 0 0 18px #792cff66;
}

.topbar h1 {
  font-size: 20px;
  letter-spacing: 2px;
}

.topbar p {
  color: #a5a0b5;
  font-size: 10px;
  letter-spacing: 2px;
  margin-top: 4px;
}

.status {
  margin-left: auto;
  color: #54e69a;
  font-size: 10px;
  font-weight: bold;
}

.dashboard {
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 20px 15px;
}

.welcome {
  padding: 25px 20px;
  border: 1px solid #38245c;
  border-radius: 16px;
  background: linear-gradient(135deg, #21133a, #111421);
  margin-bottom: 18px;
}

.welcome p:first-child {
  color: #b68aff;
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.welcome h2 {
  font-size: 23px;
  margin-bottom: 8px;
}

.welcome p:last-child {
  color: #aaa5b8;
  font-size: 13px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.stats article {
  background: #141827;
  border: 1px solid #292d40;
  border-radius: 13px;
  padding: 17px 8px;
  text-align: center;
}

.stats strong {
  display: block;
  color: #b68aff;
  font-size: 25px;
  margin-bottom: 7px;
}

.stats span {
  color: #aaa5b8;
  font-size: 9px;
  letter-spacing: 1px;
}

.menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}

.menu button {
  background: #171b2b;
  color: #c9c4d5;
  border: 1px solid #303348;
  padding: 13px 5px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
}

.menu button.active,
.menu button:active {
  background: #792cff;
  color: white;
  border-color: #a36aff;
}

.content {
  background: #111421;
  border: 1px solid #292d40;
  border-radius: 15px;
  padding: 20px;
  min-height: 220px;
}

.content h2 {
  font-size: 19px;
  margin-bottom: 12px;
}

.content p {
  color: #aaa5b8;
  font-size: 13px;
  line-height: 1.5;
}

footer {
  text-align: center;
  color: #686579;
  font-size: 10px;
  padding: 25px 10px;
}

@media (max-width: 380px) {
  .menu button {
    font-size: 8px;
    padding: 12px 2px;
  }

  .welcome h2 {
    font-size: 20px;
  }
}
