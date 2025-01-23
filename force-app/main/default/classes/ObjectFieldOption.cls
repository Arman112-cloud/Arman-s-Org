public class ObjectFieldOption {
    @AuraEnabled
    public String label { get; set; }
    @AuraEnabled
    public String value { get; set; }

    public ObjectFieldOption(String label, String value) {
        this.label = label;
        this.value = value;
    }
}
