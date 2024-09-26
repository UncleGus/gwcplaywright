Feature: Login functionality

  Scenario Outline: Valid login for <center>
    Given the user is on the login page for "<center>"
    When the user enters credentials for user "super user"
    Then the user is taken to the "<center>" dashboard

    Examples:
      | center         |
      | PolicyCenter   |
      | ClaimCenter    |
      | BillingCenter  |
      | ContactManager |

  Scenario Outline: Invalid login for <center>
    Given the user is on the login page for "<center>"
    When the user enters invalid credentials
    Then the user should be shown an error message

    Examples:
      | center         |
      | PolicyCenter   |
      | ClaimCenter    |
      | BillingCenter  |
      | ContactManager |

    Scenario: THing
      Given the user is