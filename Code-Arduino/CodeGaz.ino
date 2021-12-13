

/************************************************************************
*
* Intervention file
*
*************************************************************************
* Description: Saving a file with time and sensor values
*
* Material
* 1. Arduino Nano 33 Ble
* 2. Pmod SD 
* 3. Adafruit  MiCS5524
*
************************************************************************/

#define CS 4 // Assignment of the CS pin
#include <SPI.h> // Call of libraries
#include <SD.h>
#include <TimeLib.h>
//Initialising all the variables
int tension;
String Masque = "TU316988";
String NameFile=Masque+".csv";
const int chipSelect = 4;
String readableTime;
int reading;
File testfile;
File myFile;
void setup()
{
// Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  Serial.print("Initializing SD card...");
  // On the Ethernet Shield, CS is pin 4. It's set as an output by default.
   pinMode(CS, OUTPUT);
   
  if (!SD.begin(CS)) {
    Serial.println("initialization failed!");
    return;
  }
  // Card initialised correctly
  Serial.println("initialization done.");
  // Delete the last intervention
  if(SD.exists(NameFile)){
    SD.remove(NameFile);
  }
}

void loop()
{
  // get duration
  getReadableTime(readableTime);
  // get the value from sensor
  reading = analogRead(A0);
  // Create file for new intervention
  testfile = SD.open(Masque+".csv", FILE_WRITE);
  if (testfile) {
    // save a different number and duration each loop
    testfile.println(readableTime+","+String(reading));
    testfile.close();
  } else {
    Serial.println("error opening file");
  }
  delay(1000);
  // reopen the file to read it's content
  myFile = SD.open(Masque+".csv");
  if (myFile) {
   
    // read from the file until there's nothing else in it:
    while (myFile.available()) {
        Serial.write(myFile.read());
        
    }
    // close the file:
    myFile.close();
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
  delay(1000);
}

// function to get the time for each value that the sensor sends
void getReadableTime(String &readableTime) {
// initialise variables
  unsigned long currentMillis;
  unsigned long seconds;
  unsigned long minutes;
  unsigned long hours;
  unsigned long days;
// Get millis then calculate to know the duration
  currentMillis = millis();
  seconds = currentMillis / 1000;
  minutes = seconds / 60;
  hours = minutes / 60;
  days = hours / 24;
  currentMillis %= 1000;
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
// display day if it has been more than 0 hours
  if (days > 0) {
    readableTime = String(days) + " ";
  }
// display hour if it has been more than 0 hours
  if (hours > 0) {
    readableTime += String(hours) + ":";
  }

  if (minutes < 10) {
    readableTime += "0";
  }
  readableTime += String(minutes) + ":";

  if (seconds < 10) {
    readableTime += "0";
  }
  readableTime += String(seconds) ;
}
