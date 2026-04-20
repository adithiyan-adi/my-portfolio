import Types "../types/contact";
import ContactLib "../lib/contact";
import List "mo:core/List";

mixin (
  submissions : List.List<Types.ContactSubmission>,
) {
  public shared func submitContact(
    name : Text,
    email : Text,
    message : Text,
  ) : async Types.SubmitResult {
    ContactLib.submit(submissions, name, email, message);
  };

  public shared query func getAllSubmissions() : async [Types.ContactSubmission] {
    ContactLib.listAll(submissions);
  };
};
