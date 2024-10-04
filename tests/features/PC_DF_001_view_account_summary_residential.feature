Feature: PolicyCenter - View account summary

Background:
  Given I am logged in to PolicyCenter as Super user

@PC_DF_001
Scenario: View account summary - person type - residential
  Given I start to create a new account of type Person
  And I enter contact information for a new contact
  And I enter address information for a new address
  And I enter account classification type of Residential
  And I complete all other mandatory Create Account data
  When I update the account
  Then I am shown the account summary
