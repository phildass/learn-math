#!/bin/bash

echo "Testing Authentication Flow..."
echo ""

# Test 1: Verify sensitive files are protected
echo "1. Testing sensitive file protection..."
RESULT=$(curl -s http://localhost:3000/users.json)
if [ "$RESULT" = "Forbidden" ]; then
    echo "   ✓ users.json is protected"
else
    echo "   ✗ users.json is NOT protected"
fi

RESULT=$(curl -s http://localhost:3000/server.js)
if [ "$RESULT" = "Forbidden" ]; then
    echo "   ✓ server.js is protected"
else
    echo "   ✗ server.js is NOT protected"
fi

# Test 2: Verify public files are accessible
echo ""
echo "2. Testing public file access..."
RESULT=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login.html)
if [ "$RESULT" = "200" ]; then
    echo "   ✓ login.html is accessible"
else
    echo "   ✗ login.html is NOT accessible"
fi

# Test 3: Test registration with new user
echo ""
echo "3. Testing user registration..."
EMAIL="testuser2@example.com"
RESULT=$(curl -s -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User 2\",\"dateOfBirth\":\"1995-05-15\",\"email\":\"$EMAIL\",\"location\":\"London\",\"password\":\"test123456\"}")

if echo "$RESULT" | grep -q "success.*true"; then
    echo "   ✓ Registration successful"
else
    echo "   ✗ Registration failed: $RESULT"
fi

# Test 4: Test login with registered user
echo ""
echo "4. Testing user login..."
RESULT=$(curl -s -c cookies.txt -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"test123456\"}")

if echo "$RESULT" | grep -q "success.*true"; then
    echo "   ✓ Login successful"
else
    echo "   ✗ Login failed: $RESULT"
fi

# Test 5: Test authentication status with session
echo ""
echo "5. Testing authentication status..."
RESULT=$(curl -s -b cookies.txt http://localhost:3000/api/auth/status)
if echo "$RESULT" | grep -q "authenticated.*true"; then
    echo "   ✓ Authentication verified"
else
    echo "   ✗ Authentication check failed: $RESULT"
fi

# Test 6: Test logout
echo ""
echo "6. Testing logout..."
RESULT=$(curl -s -b cookies.txt -c cookies.txt -X POST http://localhost:3000/api/logout)
if echo "$RESULT" | grep -q "success.*true"; then
    echo "   ✓ Logout successful"
else
    echo "   ✗ Logout failed: $RESULT"
fi

# Test 7: Verify session is cleared after logout
echo ""
echo "7. Testing authentication after logout..."
RESULT=$(curl -s -b cookies.txt http://localhost:3000/api/auth/status)
if echo "$RESULT" | grep -q "authenticated.*false"; then
    echo "   ✓ Session cleared successfully"
else
    echo "   ✗ Session not cleared: $RESULT"
fi

# Cleanup
rm -f cookies.txt

echo ""
echo "All tests completed!"
