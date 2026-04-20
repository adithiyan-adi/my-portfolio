import Types "../types/contact";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func submit(
    submissions : List.List<Types.ContactSubmission>,
    name : Text,
    email : Text,
    message : Text,
  ) : Types.SubmitResult {
    let id = submissions.size();
    let entry : Types.ContactSubmission = {
      id;
      name;
      email;
      message;
      submittedAt = Time.now();
    };
    submissions.add(entry);
    #ok id;
  };

  public func listAll(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };
};
