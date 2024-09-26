Feature: PolicyCenter - View account summary

Background:
  Given I am logged in to "PolicyCenter" as "Super user"

@PC_DF_001
Scenario: View account summary - person type - residential
  Given I start to create a new account of type "Person"
  And I enter contact information for "new contact"
  And I enter address information for "new address"
  And I enter account classification type of "Residential"
  And I complete all other mandatory account information
  When I update the account
  Then I am shown the account summary
