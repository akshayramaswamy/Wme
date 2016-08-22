//
//  Metric1.swift
//  WMe-Swift
//
//  Created by Aneesh Pappu on 8/20/16.
//  Copyright © 2016 Akshay Ramaswamy. All rights reserved.
//

import UIKit

class Metric1ViewController: UIViewController{
    @IBOutlet var question1 : UILabel!
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        question1.text = "Hey! How's your past week been?"
    }
    @IBAction func nextScreen(sender: AnyObject){
        
    }
}
